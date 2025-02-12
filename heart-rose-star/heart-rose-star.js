document.addEventListener("DOMContentLoaded", function () {
    const heartContainer = document.querySelector(".hearts-container");
    const roseContainer = document.querySelector(".roses-container");
    const starContainer = document.querySelector(".stars-container");

    function createFloatingElement(type, container, symbol) {
        const element = document.createElement("div");
        element.innerHTML = symbol;
        element.classList.add(type);

        let randomSize = Math.random() * 30 + 10;
        let randomLeft = Math.random() * 100;
        let randomTop = Math.random() * 100;
        let randomDuration = Math.random() * 3 + 2;

        element.style.left = `${randomLeft}%`;
        element.style.top = `${randomTop}%`;
        element.style.fontSize = `${randomSize}px`;
        element.style.animationDuration = `${randomDuration}s`;

        container.appendChild(element);

        setTimeout(() => {
            element.remove();
        }, randomDuration * 1000);
    }

    setInterval(() => createFloatingElement("heart", heartContainer, "❤️"), 500);
    setInterval(() => createFloatingElement("rose", roseContainer, "🌹"), 1000);
    setInterval(() => createFloatingElement("star", starContainer, "✦"), 700);
});