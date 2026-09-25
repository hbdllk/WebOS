import * as nav from "./nav.js";

let newX = 0,
    newY = 0,
    startX = 0,
    startY = 0;
const MAIN = document.getElementById("main");

const app = (name) => {
    const el = document.createElement("div");
    el.className = "window window-creating";
    el.id = name + "-" + Date.now();
    el.innerHTML = `
        <div class="window__head">
            <div class="window__control">
                <button class="window__control_btn window__control_btn-close">
                    <img src="./src/images/window/window-close.svg" alt="Close">
                </button>
                <button class="window__control_btn window__control_btn-min">
                    <img src="./src/images/window/window-minimize.svg" alt="Minimize">
                </button>
                <button class="window__control_btn window__control_btn-max">
                    <img src="./src/images/window/window-maximize.svg" alt="Maximize">
                </button>
            </div>
            <span class="window__title">${name}</span>
        </div>
        <div class="window__body">
        </div>
    `;

    el.querySelector(".window__control_btn-close").addEventListener(
        "click",
        () => {
            close(el);
        },
    );
    el.querySelector(".window__control_btn-min").addEventListener(
        "click",
        () => {
            minimize(el);
        },
    );
    el.querySelector(".window__control_btn-max").addEventListener(
        "click",
        () => {
            maximize(el);
        },
    );

    el.querySelector(".window__head").addEventListener("mousedown", (e) => {
        if (el.classList.contains("window-active") === true) {
            return;
        }

        el.classList.add("window-moving");
        //nav.hide();
        console.log(document.querySelectorAll(".window"));

        startX = e.clientX;
        startY = e.clientY;

        document.addEventListener("mousemove", mouseMove);
        document.addEventListener("mouseup", mouseUp);
    });

    function mouseMove(e) {
        el.classList.add("window-moving");

        newX = startX - e.clientX;
        newY = startY - e.clientY;

        startX = e.clientX;
        startY = e.clientY;

        el.style.left = el.offsetLeft - newX + "px";
        el.style.top = el.offsetTop - newY + "px";

        saveEl(el);
    }

    function mouseUp(e) {
        //el.classList.remove("window-active");
        el.classList.remove("window-moving");

        document.removeEventListener("mousemove", mouseMove);
    }

    return el;
};

export function open(name) {
    const el = app(name);
    MAIN.appendChild(el);
    setTimeout(() => {
        el.classList.remove("window-creating");
    });
}

export function minimize(name) {
    name.classList.remove("window-active");
    name.classList.add("window-minimizing");
    nav.seek();

    setEl(name);

    setTimeout(() => {
        name.classList.remove("window-minimizing");
    }, 250);
}

export function maximize(name) {
    if (name.classList.contains("window-active")) {
        return;
    }

    name.classList.add("window-maximizing", "window-active");
    nav.hide();

    saveEl(name);
    resetEl(name);

    setTimeout(() => {
        name.classList.remove("window-maximizing");
    }, 250);
}

export function close(name) {
    name.classList.add("window-closing");
    setTimeout(() => {
        name.remove();
    }, 250);
    nav.seek();

    deleteEl(name);
}

const resetEl = (el) => {
    el.style.left = 0;
    el.style.top = 0;
};

const saveEl = (el) => {
    let elWidth = el.style.width;
    let elHeight = el.style.height;
    let elLeft = el.style.left;
    let elTop = el.style.top;
    let elPos = {
        width: elWidth,
        height: elHeight,
        left: elLeft,
        top: elTop,
    };
    localStorage.setItem(el.id, JSON.stringify(elPos));
};

const getEl = (el) => {
    let elPos = JSON.parse(localStorage.getItem(el.id));
    return elPos;
};

const setEl = (el) => {
    let elPos = getEl(el);
    el.style.width = elPos.width;
    el.style.height = elPos.height;
    el.style.left = elPos.left;
    el.style.top = elPos.top;
};

const deleteEl = (el) => {
    localStorage.removeItem(el.id);
};
