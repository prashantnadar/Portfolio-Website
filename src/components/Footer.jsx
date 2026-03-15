import { useTheme } from "../context/ThemeContext";


function Footer() {
    const { theme, toggleTheme } = useTheme(); // Access theme and toggleTheme

    return (
        <footer className={`text-center py-6 border-t text-sm text-gray-500 ${theme === "dark" ? "bg-gray-800 text-gray-400 border-gray-500" : "bg-white text-gray-500 border-gray-600"}`}>
            <span>&copy;{new Date().getFullYear()}&nbsp;Prashant Nadar</span>
        </footer>
    );
}

export default Footer;