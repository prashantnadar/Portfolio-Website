import { useEffect } from "react";

function NeonClickEffect() {
    useEffect(() => {
        const handleClick = (e) => {
            const circle = document.createElement("span");
            circle.className =
                "neon-circle fixed pointer-events-none z-50 rounded-full border-2 border-cyan-400/70 animate-neonClick";
            circle.style.width = "30px";
            circle.style.height = "30px";
            circle.style.left = `${e.clientX - 15}px`;
            circle.style.top = `${e.clientY - 15}px`;

            document.body.appendChild(circle);

            setTimeout(() => {
                circle.remove();
            }, 600); // remove after animation
        };

        window.addEventListener("click", handleClick);
        return () => window.removeEventListener("click", handleClick);
    }, []);

    return null;
}

export default NeonClickEffect;