import { useTheme } from "../context/ThemeContext";
import { personalInfo } from "../data/portfolioData";

function Contact() {
    const { theme } = useTheme();

    return (
        <section
            id="contact"
            className={`py-20 px-6 text-center ${theme === "dark"
                ? "bg-gray-900 text-gray-200"
                : "bg-gray-50 text-gray-800"
                }`}
        >
            {/* Heading */}
            <h2 className="text-4xl font-extrabold mb-10 animate-pulse">Contact</h2>

            {/* Intro + Availability + Email */}
            <div className="max-w-xl mx-auto space-y-6">
                <p className="text-gray-500 text-lg">
                    Feel free to reach out for collaboration, freelance work, or full-time opportunities.
                </p>

                <div>
                    <span className="inline-block animate-bounce bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-sm">
                        🚀 Open to Opportunities
                    </span>
                </div>

                <p className="text-lg">
                    <a
                        href={`mailto:${personalInfo.email}?subject=Portfolio Contact&body=Hello Prashant,`}
                        className="underline hover:text-blue-500 transition font-medium"
                    >
                        {personalInfo.email}
                    </a>
                </p>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-8 mt-10 mb-10">
                {personalInfo.github && (
                    <a
                        href={personalInfo.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="GitHub"
                        className="text-lg font-medium hover:text-blue-500 hover:underline transition"
                    >
                        GitHub
                    </a>
                )}
                {personalInfo.linkedin && (
                    <a
                        href={personalInfo.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="LinkedIn"
                        className="text-lg font-medium hover:text-blue-500 hover:underline transition"
                    >
                        LinkedIn
                    </a>
                )}
            </div>

            {/* Resume Button */}
            <div className="flex flex-col items-center gap-4">
                <a
                    href={personalInfo.resume}
                    download
                    className="bg-blue-500 text-white px-4 py-1 rounded-lg shadow-md hover:bg-blue-600 transition font-semibold"
                >
                    📄 Download Resume
                </a>

                <p className="text-sm animate-pulse text-gray-400 mt-2">
                    I usually respond within 24 hours.
                </p>
            </div>
        </section>
    );
}

export default Contact;