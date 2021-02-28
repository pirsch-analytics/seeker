document.addEventListener("DOMContentLoaded", () => {
    const imgs = document.getElementsByTagName("img");

    if(imgs) {
        for(let i = 0; i < imgs.length; i++) {
            imgs[i].addEventListener("click", () => {
                showOverlay(imgs[i]);
            });
        }
    }
});

function showOverlay(img) {
    const overlay = document.createElement("div");
    overlay.classList.add("img-overlay");
    overlay.innerHTML = `<div class="img-overlay-content"><img src="${img.src}" alt="${img.alt}" /></div>`;
    document.body.appendChild(overlay);
    overlay.addEventListener("click", () => {
        document.body.removeChild(overlay);
    });
}
