let index = null;
let lookup = null;
let searchTerm = null;

document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("search");
    const clear = document.getElementById("search-clear");
    const searchDebounced = debounce(search, 200);

    input.addEventListener("keyup", () => {
        searchDebounced(input.value);
    });

    input.addEventListener("focus", () => {
        const dropdown = document.getElementById("search-results");

        if(dropdown) {
            dropdown.style.visibility = "visible";
        }
    });

    document.addEventListener("click", e => {
        const dropdown = document.getElementById("search-results");

        if(dropdown && e.target !== input && !dropdown.contains(e.target)) {
            dropdown.style.visibility = "hidden";
        }
    });

    clear.addEventListener("click", () => {
        input.value = "";
    });
});

function search(term) {
    if(index) {
        performSearch(term);
    }
    else if(searchTerm) {
        searchTerm = term;
    }
    else {
        searchTerm = term;
        loadIndex();
    }
}

function performSearch(term) {
    term = term.trim();
    const output = document.getElementById("search-results");

    if(!term) {
        output.innerHTML = "";
        return;
    }

    searchTerm = null;
    const results = index.search(term);
    const resultTpl = document.getElementById("searchResult");
    const emptyTpl = document.getElementById("searchEmpty");

    if(!results.length) {
        output.innerHTML = emptyTpl.innerHTML;
    }
    else {
        output.innerHTML = "";

        for(let result of results) {
            const doc = lookup[result.ref];
            const element = document.importNode(resultTpl.content, true);
            element.querySelector("a").innerText = doc.title;
            element.querySelector("a").href = doc.uri;
            output.appendChild(element);
        }
    }
}

function loadIndex() {
    var request = new XMLHttpRequest();
    request.open("GET", "/search.json");
    request.responseType = "json";
    request.addEventListener("load", () => {
        lookup = {};
        index = lunr(function() {
            this.ref("uri");
            this.field("title");
            this.field("content");
            this.field("description");
            this.field("categories");
            this.field("tags");

            for(let doc of request.response) {
                this.add(doc);
                lookup[doc.uri] = doc;
            }
        });

        performSearch(searchTerm);
    }, false);
    request.addEventListener("error", () => {
        console.error("error loading search index");
    }, false);
    request.send();
}

function debounce(func, wait, immediate) {
    let timeout;

    return function() {
        let context = this;
        let args = arguments;

        let later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };

        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);

        if(callNow){
            func.apply(context, args);
        }
    };
}
