document.addEventListener("DOMContentLoaded", () => {
    // open active node
    const active = document.querySelector(".menu li.active");
    let parent = active.parentElement;

    while(parent && !parent.classList.contains("menu")) {
        if(parent.tagName === "UL") {
            parent.classList.remove("hidden");
        }
        else if(parent.tagName === "LI") {
            const open = parent.querySelector(".open");
            const close = parent.querySelector(".close");

            if(open && close) {
                open.classList.add("hidden");
                close.classList.remove("hidden");
            }
        }
        
        parent = parent.parentElement;
    }

    // add toggle
    const li = document.querySelectorAll(".menu li");
    
    for(let i = 0; i < li.length; i++) {
        li[i].addEventListener("click", e => {
            e.stopPropagation();
            const ul = li[i].querySelector("ul");

            if(ul) {
                ul.classList.toggle("hidden");
            }

            const open = li[i].querySelector(".open");
            const close = li[i].querySelector(".close");

            if(open && close) {
                open.classList.toggle("hidden");
                close.classList.toggle("hidden");
            }
        });
    }
});
