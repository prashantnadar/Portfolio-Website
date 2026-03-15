import { useTheme } from "../context/ThemeContext";
import { personalInfo } from "../data/portfolioData";

function Contact() {
    const { theme, toggleTheme } = useTheme(); // Access theme and toggleTheme
    return (
        <section id="contact" className={`py-20 text-center px-6 ${theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"}`}>
            <h2 className="text-3xl font-bold mb-6">Contact</h2>

            <p className="text-gray-400 mb-4">
                Feel free to reach out for collaboration or opportunities.
            </p>

            <p>
                <a href={`mailto:${personalInfo.email}?subject=Portfolio Contact&body=Hello Prashant,`}>
                    {personalInfo.email}
                </a>
            </p>

        </section>
    );
}

export default Contact;