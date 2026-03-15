import React from "react";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
    const { theme, toggleTheme } = useTheme(); // Access theme and toggleTheme

    return (
        <nav
            className={`sticky top-0 z-50 px-8 py-4 ${theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"}`}
        >
            <div className="flex justify-between items-center">
                <h1 title="Prashant Nadar Portfolio" className="text-xl font-bold"><a href="">PN</a></h1>
                <ul className="flex space-x-6 text-sm">
                    <li className="hover:underline underline-offset-4" title="Home">
                        <a href="">Home</a>
                    </li>
                    <li className="hover:underline underline-offset-4" title="About">
                        <a href="#about">About</a>
                    </li>
                    <li className="hover:underline underline-offset-4" title="Skills">
                        <a href="#skills">Skills</a>
                    </li>
                    <li className="hover:underline underline-offset-4" title="Experience">
                        <a href="#experience">Experience</a>
                    </li>
                    <li className="hover:underline underline-offset-4" title="Projects">
                        <a href="#projects">Projects</a>
                    </li>
                    <li className="hover:underline underline-offset-4" title="Contact">
                        <a href="#contact">Contact</a>
                    </li>
                </ul>
                {/* <button onClick={toggleTheme}>Toggle Theme</button> */}
                {/* Theme Toggle Button */}
                <button onClick={toggleTheme} title={`${theme === "dark" ? "Light Mode" : "Dark Mode"}`} className={`p-2 rounded-lg ${theme === "dark" ? "hover:bg-gray-700" : "bg-white hover:bg-gray-100"}`}>
                    {theme === "dark" ? (
                        /* Sun Icon */
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364 6.364l-1.414-1.414M7.05 7.05 5.636 5.636m12.728 0L16.95 7.05M7.05 16.95l-1.414 1.414"
                            />
                            <circle cx="12" cy="12" r="4" />
                        </svg>
                    ) : (
                        /* Moon Icon */
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M21 12.79A9 9 0 0111.21 3c0-.34.02-.67.05-1A9 9 0 1021 12.79z" />
                        </svg>
                    )}

                </button>
            </div>
        </nav>
    );
}

export default Navbar;
