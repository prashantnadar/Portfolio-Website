import React from "react";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false); // mobile menu state

    const { theme, toggleTheme } = useTheme(); // Access theme and toggleTheme

    return (
        <nav
            className={`sticky top-0 z-50 px-4 xs:px-6 sm:px-8 lg:px-12 2xl:px-20 py-3 sm:py-4 ${theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"}`}
        >
            <div className="flex justify-between items-center w-full max-w-7xl mx-auto">

                <h1 title="Prashant Nadar Portfolio" className="text-lg xs:text-xl sm:text-xl md:text-2xl 2xl:text-3xl font-bold">
                    <a href="">PN</a>
                </h1>

                {/* Desktop Menu */}
                <ul className="hidden md:flex space-x-3 xs:space-x-4 sm:space-x-6 md:space-x-8 text-xs xs:text-sm sm:text-sm md:text-base lg:text-base xl:text-lg">
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

                <div className="flex items-center gap-2 sm:gap-4">

                    {/* Mobile Hamburger Button */}
                    <button
                        className={`md:hidden p-2 rounded-lg ${theme === "dark" ? "hover:bg-gray-700 text-gray-200" : "hover:bg-gray-100 text-gray-800"}`}
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    {/* <button onClick={toggleTheme}>Toggle Theme</button> */}

                    {/* Theme Toggle Button */}
                    <button onClick={toggleTheme} title={`${theme === "dark" ? "Light Mode" : "Dark Mode"}`} className={`p-1.5 xs:p-2 rounded-lg ${theme === "dark" ? "hover:bg-gray-700" : "bg-white hover:bg-gray-100"}`}>
                        {theme === "dark" ? (
                            /* Sun Icon */
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 sm:w-6 sm:h-6 xl:w-7 xl:h-7"
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
                                className="w-5 h-5 sm:w-6 sm:h-6 xl:w-7 xl:h-7"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M21 12.79A9 9 0 0111.21 3c0-.34.02-.67.05-1A9 9 0 1021 12.79z" />
                            </svg>
                        )}

                    </button>

                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <ul className="md:hidden mt-4 xs:grid-cols-2 flex flex-wrap gap-4 text-sm px-2 pb-4">
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
            )}

        </nav>
    );
}

export default Navbar;