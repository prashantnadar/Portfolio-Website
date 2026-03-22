import { useTheme } from "../context/ThemeContext";


function Footer() {
    const { theme, toggleTheme } = useTheme(); // Access theme and toggleTheme

    return (
        <footer className={`text-center py-6 border-t text-sm text-gray-500 ${theme === "dark" ? "bg-gray-800 text-gray-400 border-gray-500" : "bg-white text-gray-500 border-gray-600"}`}>
            <div>Made with ❤️ for a better web</div>
            {/* <div>&copy;{new Date().getFullYear()}</div> */}
            <small class="font-sans antialiased text-sm text-current text-center">
                <span>&copy;{new Date().getFullYear()}</span><a title="Developer" href="https://www.instagram.com/prashant_dev_18/" target="_blank" className="hover:underline underline-offset-2 cursor-pointer">&nbsp;Prashant Nadar.&nbsp;</a>All Rights Reserved.
            </small>
        </footer>
    );
}
export default Footer;