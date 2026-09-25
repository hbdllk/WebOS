import * as $ from "./utils.js";
import * as nav from "./nav.js";
import { templates } from "./templates.js";

let newX = 0, newY = 0, startX = 0, startY = 0;
const MAIN = document.getElementById("main");

const ls = {
    save: function (window) {
        let windows = $.ls.get("windows") || [];
        const win = {
            id: window.id,
            pos: {
                x: window.style.left,
                y: window.style.top,
            },
        };
        windows.push(win);
        $.ls.set("windows", windows);
    },
    forget: function (window) {
        let windows = $.ls.get("windows");
        windows = windows.filter(win => win.id !== window.id);

        $.ls.set("windows", windows)
    }
};

const pos = {
    save: function(window) {
        let windows = $.ls.get("windows");

        const el = windows.find(win => win.id === window.id);

        el.pos = {
            x: window.style.left,
            y: window.style.top,
        };

        $.ls.set("windows", windows);
    },
    def: function(window) {
        window.style.left = 0;
        window.style.top = 0;
    },
    reset: function(window) {
        let windows = $.ls.get("windows");
        const win = windows.find(win => win.id === window.id);

        window.style.left = win.pos.x;
        window.style.top = win.pos.y;
    }
};

const window = (app) => {
    const windowContent = `
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
            <span class="window__title">${app.name}</span>
        </div>
        <div class="window__body">
            ${app.content}
        </div>`;
    const window = $.createElement({
        tag: "div",
        cls: "window window-creating",
        id: app.id + "-" + Date.now(),
        content: windowContent
    });
    $.setEventListener($.selectElement(window, ".window__control_btn-close"), "click", ()=>{ close(window) });
    $.setEventListener($.selectElement(window, ".window__control_btn-min"), "click", ()=>{ min(window) });
    $.setEventListener($.selectElement(window, ".window__control_btn-max"), "click", ()=>{ max(window) });

    $.setEventListener($.selectElement(window, ".window__head"), "mousedown", down);

    return window
}

export function open(app) {
    const el = window(app);
    MAIN.appendChild(el);
    setTimeout(() => { el.classList.remove("window-creating") });

    ls.save(el);
}

function down(e) {
    console.log("begining");
    const window = this.parentElement;

    if (window.classList.contains("window-active") === true) { return }

    window.classList.add("window-moving");

    startX = e.clientX;
    startY = e.clientY;

    $.setEventListener(document, "mousemove", move);
    $.setEventListener(document, "mouseup", up);

    function move(e) {
        newX = startX - e.clientX;
        newY = startY - e.clientY;

        startX = e.clientX;
        startY = e.clientY;

        window.style.left =
            window.offsetLeft - newX + "px";
        window.style.top =
            window.offsetTop - newY + "px";

        pos.save(window);
    }

    function up() {
        window.classList.remove("window-moving");
        $.unsetEventListener("mousemove", move);
    }
}

function close(window) {
    window.classList.add("window-closing");
    ls.forget(window);

    setTimeout(()=>{ window.remove() }, 250);

    nav.seek();
}

function min(window) {
    window.className = "window window-minimizing";
    pos.reset(window);

    setTimeout(() => { window.className = "window" }, 250)

    nav.seek()
}

function max(window) {
    if (window.classList.contains("window-active")) { return }
    window.classList.add("window-maximizing", "window-active");

    pos.def(window);

    setTimeout(() => { window.classList.remove("window-maximizing") }, 250)

    nav.hide()
}

function test(app) {
    open(app);
    console.log(window(app))
};

test(templates.youtube);