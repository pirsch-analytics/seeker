document.addEventListener("DOMContentLoaded", () => {
    // open active node
    const active = document.querySelector(".sidebar li.active");

    if(active) {
        // add toggle
        const li = document.querySelectorAll(".sidebar li");
        
        for(let i = 0; i < li.length; i++) {
            const icon = li[i].querySelector(".icon");

            if(icon) {
                icon.addEventListener("click", e => {
                    e.stopPropagation();
                    const ul = li[i].querySelector("ul");
    
                    if(ul) {
                        ul.classList.toggle("hidden");
                    }

                    icon.classList.toggle("open");
                });
            }
        }
    }

    let sideBar = document.getElementById("sideBar");
    let sideBarToggle = document.getElementById("sideBarToggle");
    let sideBarOpen = document.getElementById("sideBarOpen");
    let sideBarClose = document.getElementById("sideBarClose");

    if(sideBarClose) {
        sideBarClose.style.display = "none";
    }

    function toggleSideBar(ignoreIfClosed) {
        let visible = sideBar.classList.contains("open");

        if(ignoreIfClosed && !visible) {
            return;
        }

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
});
