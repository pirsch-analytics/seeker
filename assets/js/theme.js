function enableDarkMode() {
    document.documentElement.classList.add("theme-dark");
    document.documentElement.classList.remove("theme-light");
}

if(window.matchMedia("(prefers-color-scheme: dark)").matches) {
    enableDarkMode();
}