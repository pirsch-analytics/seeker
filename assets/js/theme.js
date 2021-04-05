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

            console.log("test")
            
            darkMode = localStorage.getItem("darkMode"); 
            
            if (darkMode !== "enabled") {
                enableDarkMode();
            } else {  
                disableDarkMode(); 
            }
        });
    }

    let sideBar = document.getElementById("sideBar");
    let sideBarToggle = document.getElementById("sideBarToggle");
    let sideBarOpen = document.getElementById("sideBarOpen");
    let sideBarClose = document.getElementById("sideBarClose");

    if(sideBarClose) {
        sideBarClose.style.display = "none";
    }

    function toggleSideBar() {
        let visible = sideBar.classList.contains("open");

        sideBarOpen.style.display = visible ? "" : "none";
        sideBarClose.style.display = visible ? "none" : "";

        if(visible) {
            sideBar.classList.remove("open");
        } else {
            sideBar.classList.add("open");
        }
    }

    if(sideBarToggle) {
        sideBarToggle.addEventListener("click", e => {
            e.preventDefault();
            e.stopPropagation();
            toggleSideBar();
        });
    }

    document.addEventListener("click", e => {
        if(sideBar && !sideBar.contains(e.target)) {
            toggleSideBar(true);
        }
    });
}, false);
