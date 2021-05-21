let index = null;
let lookup = null;
let searchTerm = null;
let activeResult = 0;

document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("search");
    const clear = document.getElementById("search-clear");
    const searchDebounced = debounce(search, 200);
    let currentInput = "";

    input.addEventListener("keydown", e => {
        if(e.key === "ArrowDown") {
            e.preventDefault();
            selectResult(1);
        }
        else if(e.key === "ArrowUp") {
            e.preventDefault();
            selectResult(-1);
        }
        else if(e.key === "Enter") {
            openResult();
        }
        else if(e.key === "Escape") {
            clearInput();
        }
    });

    input.addEventListener("keyup", () => {
        if(input.value !== currentInput) {
            currentInput = input.value;
            searchDebounced(input.value);
        }
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
        clearInput();
    });

    function clearInput() {
        input.value = "";
    }
});

function selectResult(direction) {
    const results = document.querySelectorAll("#search-results a");
    
    if(direction === 0 || results.length === 0) {
        activeResult = 0;
    }
    else {
        activeResult += direction;

        if(activeResult < 0) {
            activeResult = results.length-1;
        }
        else if(activeResult > results.length-1) {
            activeResult = 0;
        }
    }

    if(results.length) {
        for(let i = 0; i < results.length; i++) {
            results[i].classList.remove("active");
        }

        results[activeResult].classList.add("active");
    }
}

function openResult() {
    const results = document.querySelectorAll("#search-results a");

    if(results) {
        location.href = results[activeResult].href;
    }
}

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

    selectResult(0);
}

function loadIndex() {
    var request = new XMLHttpRequest();
    request.open("GET", "{{.Site.BaseURL}}search.json");
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
