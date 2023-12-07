window.addEventListener("load", () => {
    setTimeout(() => {
        typewriter();
    }, 500);
});
window.addEventListener("scroll", () => { typewriter(); });

function typewriter() {
    const typewriters = document.querySelectorAll(".typewriter");
    
    typewriters.forEach((typewriter) => {
        if (isElementInViewport(typewriter) && typewriter.innerHTML === "") {
            const text = typewriter.getAttribute("text");

            let offset = 1;

            [...text].forEach((char, index) => {
                setTimeout(() => {
                    if (typewriter.innerHTML !== text + '<span aria-hidden="true"></span>') {
                        offset += char === "<" ? 3 : 0;

                        offset += /\p{Emoji}/u.test(char) ? 1 : 0;

                        typewriter.innerHTML = text.substring(0, index + offset) + '<span aria-hidden="true"></span>';
                    }
                }, 50 * index);
            });
        }
    });
}

function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

window.addEventListener("click", (event) => { changeTypewriter(event); });

function changeTypewriter(event) {
    const element = event.target;
    const unsopportedElements = ["HTML", "BODY", "SECTION", "DIV", "BUTTON", "A", "IMG", "I"]
    
    if (!unsopportedElements.includes(element.tagName)) {
        console.log(element.tagName)
        document.querySelectorAll(".typewriter").forEach((element) => {
            element.classList.remove("typewriter");
            element.removeChild(element.lastChild);
        })
        element.classList.add("typewriter");
        element.innerHTML += '<span aria-hidden="true"></span>';
    }
}