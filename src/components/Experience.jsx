import { useTheme } from "../context/ThemeContext";


function Experience() {
    const { theme, toggleTheme } = useTheme(); // Access theme and toggleTheme

    return (
        <div className={`w-full ${theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"}`}>
            <section
                id="experience"
                className={`py-20 px-6 max-w-5xl mx-auto ${theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"}`}
                aria-labelledby="experience-heading"
            >
                {/* Section Title */}
                <h2
                    id="experience-heading"
                    className="text-3xl font-bold mb-10 text-center"
                >
                    Professional Experience
                </h2>

                {/* Experience Card */}
                <article className={`bg-gray-900 border border-gray-800 rounded-lg p-6 ${theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"}`}>

                    {/* Job Header */}
                    <header className="mb-4">
                        <h3 className="text-xl font-semibold">
                            Jr. Frontend Developer
                        </h3>

                        <p className="text-gray-400 text-sm">
                            Secure Access Tech Private Limited
                        </p>

                        <p className="text-gray-500 text-sm">
                            July 2024 – Present
                        </p>
                    </header>

                    {/* Responsibilities */}
                    <ul className="list-disc pl-6 space-y-2 text-gray-400 text-sm leading-relaxed">
                        <li>
                            Developed scalable and responsive React.js interfaces using
                            TypeScript and Tailwind CSS.
                        </li>

                        <li>
                            Built reusable component-based architecture improving maintainability
                            and reducing duplicated UI code.
                        </li>

                        <li>
                            Implemented state management using Redux and Context API.
                        </li>

                        <li>
                            Integrated REST APIs from FastAPI backend services to deliver
                            dynamic application data.
                        </li>

                        <li>
                            Designed responsive layouts optimized for mobile, tablet,
                            and desktop devices.
                        </li>

                        <li>
                            Applied semantic HTML and accessibility best practices.
                        </li>

                        <li>
                            Collaborated with backend developers and designers in Agile
                            development cycles.
                        </li>

                        <li>
                            Managed tasks, bug tracking, and development workflows
                            using Git and Jira.
                        </li>
                    </ul>
                </article>
            </section>
        </div>
    );
}

export default Experience;