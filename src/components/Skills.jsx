import { skills } from "../data/portfolioData";
import { useTheme } from "../context/ThemeContext";


function Skills() {
    const { theme, toggleTheme } = useTheme(); // Access theme and toggleTheme
    return (
        <section
            id="skills"
            aria-labelledby="skills-heading"
            className={`py-20 px-6 text-center ${theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"}`}
        >
            <h2
                id="skills-heading"
                className="text-3xl font-bold mb-10"
            >
                Technical Skills
            </h2>

            <ul className="flex flex-wrap justify-center gap-4">

                {skills.map((skill, index) => (
                    <li
                        key={index}
                        title={skill}
                        className="px-4 py-2 rounded-lg text-sm border border-gray-200 cursor-pointer hover:scale-110 shadow-md hover:bg-blue-400 hover:text-gray-100"
                    >
                        {skill}
                    </li>
                ))}

            </ul>
        </section>
    );
}

export default Skills;