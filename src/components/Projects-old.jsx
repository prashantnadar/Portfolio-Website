import React from "react";
import useGithubRepos from "../hooks/useGithubRepos";
import { useTheme } from "../context/ThemeContext";


function Projects() {
    const { theme, toggleTheme } = useTheme(); // Access theme and toggleTheme
    const { repos, loading, error } = useGithubRepos();

    if (loading) return <p>Loading repositories...</p>;
    if (error) return <p>Error fetching repositories.</p>;

    return (
        <div className={`w-full ${theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"}`}>
            <section
                id="projects"
                className={`py-20 px-6 max-w-6xl mx-auto ${theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"}`}
                aria-labelledby="projects-heading"
            >
                <h2
                    id="projects-heading"
                    className="text-3xl font-bold text-center mb-12"
                >
                    Projects
                </h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {repos.map((repo) => (
                        <article
                            key={repo.id}
                            className={`border border-gray-800 p-6 rounded-lg shadow-lg hover:scale-110 ${theme === "dark" ? "bg-gray-700 text-gray-200 shadow-lg" : "bg-white text-gray-800 border-gray-300"}`}
                        >
                            <h3 className="text-xl font-semibold mb-3">
                                {repo.name}
                            </h3>

                            <p className="text-gray-400 text-sm mb-4">
                                {repo?.description || "No description provided"}
                            </p>

                            <div className="flex justify-between items-center">
                                <span className="text-blue-400 text-sm">
                                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                                        View Repository →
                                    </a>
                                </span>
                                <span className="text-gray-400 text-sm">
                                    ⭐ {repo.stargazers_count} | 🍴 {repo.forks_count}
                                </span>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Projects;