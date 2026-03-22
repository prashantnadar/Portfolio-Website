import React from "react";
import useGithubRepos from "../hooks/useGithubRepos";
import { useTheme } from "../context/ThemeContext";

function Projects() {
    const { theme } = useTheme();
    const { repos, loading, error } = useGithubRepos();

    // ✅ Custom LIVE project
    const customProjects = [
        {
            id: "ask-legal-vision",
            name: "Ask Legal Vision",
            description:
                "Professional legal services website for Adv. Aditya Shankar Kharche. Focused on Employment Law, Civil Litigation, and HR Legal Solutions.",
            html_url: "https://asklegalvision.in/",
            isLive: true,
        },
    ];

    // ✅ Merge custom + GitHub repos
    const allProjects = [...customProjects, ...repos];

    if (loading)
        return <p className="text-center py-10">Loading repositories...</p>;
    if (error)
        return (
            <p className="text-center py-10 text-red-500">
                Error fetching repositories.
            </p>
        );

    return (
        <div
            className={`w-full ${theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"}`}
        >
            <section
                id="projects"
                className={`py-20 px-6 max-w-6xl mx-auto`}
                aria-labelledby="projects-heading"
            >
                <h2
                    id="projects-heading"
                    className="text-3xl font-bold text-center mb-12"
                >
                    Projects
                </h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {allProjects.map((repo) => (
                        <article
                            key={repo.id}
                            className={`
                                p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105
                                ${repo.isLive ? "border-2 border-blue-500 ring-2 ring-blue-400" : "border"}
                                ${theme === "dark"
                                    ? "bg-gray-700 text-gray-200 border-gray-600"
                                    : "bg-white text-gray-800 border-gray-300"
                                }
                            `}
                        >
                            {/* 🔥 LIVE Badge */}
                            {repo.isLive && (
                                <span className="inline-block mb-3 px-3 py-1 text-xs font-bold bg-green-500 text-white rounded-full animate-pulse">
                                    🚀 LIVE PROJECT
                                </span>
                            )}

                            <h3 className="text-xl font-semibold mb-3">{repo.name}</h3>

                            <p className="text-gray-400 text-sm mb-4">
                                {repo?.description || "No description provided"}
                            </p>

                            {/* <div className="flex justify-between items-center">
                                <a
                                    href={repo.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 text-sm hover:underline"
                                >
                                    {repo.isLive ? "Visit Website →" : "View Repository →"}
                                </a>

                                <span className={`text-gray-400 text-sm ${repo.isLive ? "text-red-700 font-semibold" : ""}`}>
                                    {repo.isLive
                                        ? "🌐 Live"
                                        : `⭐ ${repo.stargazers_count} | 🍴 ${repo.forks_count}`}
                                </span>
                            </div> */}
                            <div className="flex justify-between items-center gap-3 flex-wrap">
                                <div className="flex gap-3">
                                    {/* 🌐 Live link (for custom OR GitHub projects) */}
                                    {(repo.isLive || repo.homepage) && (
                                        <a
                                            href={repo.isLive ? repo.html_url : repo.homepage}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            🌐
                                            <span className="text-green-400 text-sm hover:underline font-medium">
                                                &nbsp;View Website
                                            </span>
                                        </a>
                                    )}

                                    {/* 📂 GitHub link (only for GitHub repos) */}
                                    {!repo.isLive && (
                                        <a
                                            href={repo.html_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            📂
                                            <span className="text-blue-400 text-sm hover:underline">
                                                &nbsp;Code
                                            </span>
                                        </a>
                                    )}
                                </div>

                                <span
                                    className={`text-gray-400 text-sm ${repo.isLive ? "text-red-500 font-semibold" : ""
                                        }`}
                                >
                                    {repo.isLive
                                        ? "🚀 Production"
                                        : `⭐ ${repo.stargazers_count} | 🍴 ${repo.forks_count}`}
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