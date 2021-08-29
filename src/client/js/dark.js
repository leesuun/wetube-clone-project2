const darkMode = document.getElementById("darkMode");
const body = document.querySelector("body");
const main = document.querySelector("main");
const span = main.getElementsByTagName("span");
const input = main.getElementsByTagName("input");
const button = main.getElementsByTagName("button");
const h2 = main.getElementsByTagName("h2");

const handleWhiteMode = () => {
    body.style.backgroundColor = "#181818";

    for (let i = 0; i < span.length; i++) {
        span[i].style.color = "white";
    }

    for (let i = 0; i < input.length; i++) {
        input[i].style.backgroundColor = "white";
        input[i].style.color = "black";
    }

    for (let i = 0; i < button.length; i++) {
        button[i].style.backgroundColor = "white";
        button[i].style.color = "black";
    }

    for (let i = 0; i < h2.length; i++) {
        h2[i].style.color = "white";
    }

    darkMode.removeEventListener("click", handleWhiteMode);
    darkMode.addEventListener("click", handleDarkMode);
};

const handleDarkMode = () => {
    body.style.backgroundColor = "white";

    for (let i = 0; i < span.length; i++) {
        span[i].style.color = "black";
    }

    for (let i = 0; i < input.length; i++) {
        input[i].style.backgroundColor = "black";
        input[i].style.color = "white";
    }

    for (let i = 0; i < button.length; i++) {
        button[i].style.backgroundColor = "black";
        button[i].style.color = "white";
    }

    for (let i = 0; i < h2.length; i++) {
        h2[i].style.color = "black";
    }

    darkMode.removeEventListener("click", handleDarkMode);
    darkMode.addEventListener("click", handleWhiteMode);
};

darkMode.addEventListener("click", handleDarkMode);
