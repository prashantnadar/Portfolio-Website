import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { personalInfo } from "../data/portfolioData";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

function Contact() {
    const { theme, toggleTheme } = useTheme(); // Access theme and toggleTheme

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [cooldown, setCooldown] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const sendEmail = (e) => {
        e.preventDefault();

        if (cooldown) return;

        // validations
        if (!form.name || !form.email || !form.message) {
            toast.error("All fields are required");
            return;
        }

        if (!validateEmail(form.email)) {
            toast.error("Enter a valid email");
            return;
        }

        setLoading(true);
        setCooldown(true);

        emailjs
            .send(
                "service_154sfju", // EmailJs_SERVICE_ID
                "template_5k7dqag", // EmailJs_Template_ID
                {
                    from_name: form.name,
                    from_email: form.email,
                    message: form.message,
                },
                "Bta7lHx7MgqYNV1NK", // EmailJs_Public_Key
            )
            .then(() => {
                toast.success("Message sent successfully 🚀");

                setForm({
                    name: "",
                    email: "",
                    message: "",
                });
            })
            .catch(() => {
                toast.error("Failed to send message");
            })
            .finally(() => {
                setLoading(false);
            });

        // spam protection (5 sec)
        setTimeout(() => {
            setCooldown(false);
        }, 5000);
    };

    return (
        <section
            id="contact"
            className={`py-20 px-6 text-center  ${theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"}`}
        >
            {/* Heading */}
            <h2 className="text-4xl font-extrabold mb-10 animate-pulse">Contact</h2>

            {/* Intro + Availability + Email */}
            <div className="max-w-xl mx-auto space-y-6">
                <p className="text-gray-500 text-lg">
                    Feel free to reach out for collaboration, freelance work, or full-time
                    opportunities.
                </p>

                <div>
                    <span className="inline-block animate-bounce bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-sm">
                        🚀 Open to Opportunities
                    </span>
                </div>

                {/* <p className="text-lg">
                    <a
                        href={`mailto:${personalInfo.email}?subject=Portfolio Contact&body=Hello Prashant,`}
                        className="underline hover:text-blue-500 transition font-medium"
                    >
                        {personalInfo.email}
                    </a>
                </p> */}
                <form onSubmit={sendEmail} className="max-w-xl mx-auto mt-8 space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className={`w-full p-3 rounded border  ${theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"}`}
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className={`w-full p-3 rounded border border-gray-300  ${theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"}`}
                    />

                    <textarea
                        name="message"
                        placeholder="Your Message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows="4"
                        className={`w-full p-3 rounded border  ${theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"}`}
                    />

                    <button
                        type="submit"
                        disabled={loading || cooldown}
                        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                    >
                        {loading ? "Sending..." : cooldown ? "Wait..." : "Send Message"}
                    </button>
                </form>
                <p className="text-sm mt-4">
                    Or email directly:{" "}
                    <a href={`mailto:${personalInfo.email}`} className="underline">
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
