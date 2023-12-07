let wrapperContainer = document.querySelector("#wrapper-container");

let prevHeight = wrapperContainer.offsetHeight;

let wrapperContainerObserver = new ResizeObserver(entries => {
    for (const entry of entries) {
        const height = entry.contentRect.height;
        if (height !== prevHeight) {
            prevHeight = height;
            handleWrapperResize();
        }
    }
});

wrapperContainerObserver.observe(wrapperContainer);

window.addEventListener("load", handleWrapperResize);

function handleWrapperResize() {
    const totalNumber = getTotalNumber()

    document.querySelector("#numbar ul").innerHTML = "";
    for (let i = 0; i < totalNumber; i++) {
        const li = document.createElement("li");
        li.textContent = i;
        li.classList.add("numbar-item");
        document.querySelector("#numbar ul").appendChild(li);
    }
}

function getTotalNumber() {
    const wrapperHeight = wrapperContainer.offsetHeight;
    console.log(wrapperHeight)
    return (wrapperHeight - 16) / 24;
}

window.addEventListener("mousemove", (event) => {
    const list = document.querySelectorAll(".numbar-item");
    list.forEach((item) => {
        item.classList.remove("active");
        if (item.getBoundingClientRect().top <= event.clientY && item.getBoundingClientRect().bottom >= event.clientY) {
            item.classList.add("active");
        }
    })
})