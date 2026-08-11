import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  toggleTheme: () => {},
});

export const THEME_STORAGE_KEY = "pn-theme";

/**
 * Runs in the browser before React hydration.
 *
 * This prevents a flash of the wrong theme while keeping
 * browser-only APIs out of the server render.
 */
export const themeBootstrapScript = `(function () {
  try {
    var stored = localStorage.getItem("${THEME_STORAGE_KEY}");
    var theme =
      stored === "dark" || stored === "light"
        ? stored
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";

    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
  } catch (e) {}
})();`;

function getInitialTheme(): Theme {
  // Always return the same value during SSR and the first client render.
  // Browser-specific theme detection happens after hydration.
  return "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  /**
   * Read the user's saved/system theme only after hydration.
   */
  useEffect(() => {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);

      if (stored === "dark" || stored === "light") {
        setTheme(stored);
        return;
      }

      const systemTheme: Theme = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches
        ? "dark"
        : "light";

      setTheme(systemTheme);
    } catch {
      // Keep the safe default: light.
    }
  }, []);

  /**
   * Keep the DOM and localStorage synchronized with React state.
   */
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;

    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore storage failures.
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}