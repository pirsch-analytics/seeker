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
});
