document.addEventListener("DOMContentLoaded", () => {
    // open active node
    const active = document.querySelector(".menu li.active");

    if(active) {
        // expand parents
        let parent = active.parentElement;

        while(parent && !parent.classList.contains("menu")) {
            if(parent.tagName === "UL") {
                parent.classList.remove("hidden");
            }
            else if(parent.tagName === "LI") {
                const icon = parent.querySelector(".icon");

                if(icon) {
                    icon.classList.toggle("open");
                }
            }
            
            parent = parent.parentElement;
        }
        
        // show children
        let children = active.children;
        
        for(let i = 0; i < children.length; i++) {
            children[i].classList.remove("hidden");
        }

        // rotate icon
        const icon = active.querySelector(".icon")

        if(icon) {
            icon.classList.toggle("open");
        }

        // add toggle
        const li = document.querySelectorAll(".menu li");
        
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
});
