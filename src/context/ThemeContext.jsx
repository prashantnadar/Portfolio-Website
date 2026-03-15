import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the theme context
const ThemeContext = createContext();

// ThemeProvider to wrap the app and provide theme context
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light'); // Default to 'light'

    // Check localStorage or use system preference
    useEffect(() => {
        const storedTheme = localStorage.getItem('theme') || 'light';
        setTheme(storedTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Custom hook to use the theme in other components
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};