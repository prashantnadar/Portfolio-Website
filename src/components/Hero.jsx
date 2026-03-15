import { useTheme } from "../context/ThemeContext";
import { personalInfo } from "../data/portfolioData";

function Hero() {
    const { theme, toggleTheme } = useTheme(); // Access theme and toggleTheme
    return (
        <section
            className={`min-h-screen flex flex-col justify-center items-center text-center px-6 ${theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"}`}
            aria-labelledby="hero-heading"
        >

            <h1
                id="hero-heading"
                className="text-5xl md:text-6xl font-bold mb-6"
            >
                {personalInfo.name}
            </h1>

            <p className="text-xl text-gray-400 mb-6">
                {personalInfo.role}
            </p>

            <p className="max-w-xl text-gray-500 mb-8">
                I build scalable and performant web applications
                using React, TypeScript, and modern frontend technologies.
            </p>

            <div className="flex gap-4">

                <a
                    href="#projects"
                    className="bg-blue-500 hover:bg-blue-600 text-gray-100 px-6 py-3 rounded-lg text-sm"
                >
                    View Projects
                </a>

                <a
                    href="https://github.com/prashantnadar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-gray-700 px-6 py-3 rounded-lg text-sm"
                >
                    GitHub
                </a>

            </div>

        </section>
    );
}

export default Hero;