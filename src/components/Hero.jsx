import { useTheme } from "../context/ThemeContext";
import { personalInfo } from "../data/portfolioData";
import { Typewriter } from "react-simple-typewriter"; // Added for typewriter effect

function Hero() {
    const { theme, toggleTheme } = useTheme(); // Access theme and toggleTheme
    return (
        <section
            className={`min-h-screen flex flex-col justify-center items-center text-center px-4 xs:px-6 sm:px-8 md:px-12 lg:px-20 xl:px-32 2xl:px-40 ${theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"}`}
            aria-labelledby="hero-heading"
        >

            <h1
                id="hero-heading"
                className="max-w-4xl g-red-600 text-xl xs:text-xs sm:text-sm md:text-md lg:text-lg xl:text-4xl 2xl:text-4xl text-wrap font-sans font-bold mb-6"
            >
                {/* Typewriter effect for your name */}
                <Typewriter
                    words={[
                        `${personalInfo.name} | Frontend Developer`,
                        "HTML5 | CSS3 | JavaScript (ES6+) | TypeScript | React | Tailwind CSS | Git | REST API"
                    ]}
                    loop={0}
                    cursor
                    cursorStyle="|"
                    typeSpeed={80}
                    deleteSpeed={30}
                    delaySpeed={1000}
                />
            </h1>

            {/* <p className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-400 mb-6">
                {personalInfo.role}
            </p> */}

            <p className="max-w-md xs:max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl text-sm xs:text-base sm:text-lg md:text-xl text-gray-500 mb-8">
                I build scalable and performant web applications
                using React, javascript, TypeScript, and modern frontend technologies.
            </p>

            <div className="flex flex-col xs:flex-row gap-3 xs:gap-4 sm:gap-6">
                <a
                    href="#projects"
                    className="bg-blue-500 hover:bg-blue-600 text-gray-100 px-6 py-3 rounded-lg text-sm xs:text-base sm:text-base md:text-lg"
                >
                    View Projects
                </a>

                <a
                    href="https://github.com/prashantnadar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-gray-700 px-6 py-3 rounded-lg text-sm xs:text-base sm:text-base md:text-lg"
                >
                    GitHub
                </a>
            </div>

        </section>
    );
}

export default Hero;