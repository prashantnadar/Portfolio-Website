import { useTheme } from "../context/ThemeContext"; // Import the useTheme hook to access theme

/**
 * About Section
 * Displays professional summary from resume
 * Uses semantic HTML for better SEO and accessibility
 */

function About() {
    const { theme } = useTheme(); // Access the current theme

    return (
        <section
            id="about"
            className="py-20 px-6 max-w-5xl mx-auto"
            aria-labelledby="about-heading"
        >
            <h2
                id="about-heading"
                className={`text-3xl font-bold mb-6 text-center ${theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"}`} // Dynamic text color based on theme
            >
                About Me
            </h2>

            <p
                className={`leading-relaxed text-center ${theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"}`} // Dynamic text color based on theme
            >
                Frontend Developer with 1.7+ years of experience building scalable and
                responsive web applications using React.js, TypeScript, JavaScript
                (ES6+), and Tailwind CSS. Experienced in component-based architecture,
                Redux and Context API state management, and REST API integration.
                Focused on accessibility, responsive design, performance optimization,
                and cross-browser compatibility.
            </p>
        </section>
    );
}

export default About;
