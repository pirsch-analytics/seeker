document.addEventListener('DOMContentLoaded', function() {
    let darkMode = localStorage.getItem("darkMode");

    if(darkMode === null && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        enableDarkMode();
    }

    function enableDarkMode() {
        document.documentElement.classList.add("theme-dark");
        document.documentElement.classList.remove("theme-light");
        localStorage.setItem("darkMode", "enabled");
    }

    function disableDarkMode() {
        document.documentElement.classList.add("theme-light");
        document.documentElement.classList.remove("theme-dark");
        localStorage.setItem('darkMode', null);
    }

    if(darkMode === "enabled") {
        enableDarkMode();
    }

    const darkModeToggle = document.querySelector("#darkModeToggle");

    if(darkModeToggle) {
        darkModeToggle.addEventListener("click", e => {
            e.preventDefault();
            e.stopPropagation();
            darkMode = localStorage.getItem("darkMode"); 
            
            if (darkMode !== "enabled") {
                enableDarkMode();
            } else {  
                disableDarkMode(); 
            }
        });
    }
});
