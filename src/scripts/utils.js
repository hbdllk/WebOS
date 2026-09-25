export const createElement = ({ tag = "div", cls = "", id = "", content = "" } = {}) => {
    const el = document.createElement(tag);
    if (cls) el.className = cls;
    if (id) el.id = id;
    if (content) el.innerHTML = content;

    return el
}

export function setEventListener(target, evnt, func) {
    target.addEventListener(evnt, func);
}

export function unsetEventListener(evnt, func) {
    document.removeEventListener(evnt, func);
}

export function selectElement(from, el) {
    return from.querySelector(el);
}

export const cls = {
    add: function(el, cls) {
        el.classList.add(cls);
    },
    remove: function(el, cls) {
        el.classList.remove(cls);
    },
    toggle: function(el, cls) {
        el.classList.toggle(cls);
    }
}

export const ls = {
    set: function(name, el) {
        localStorage.setItem(name, JSON.stringify(el));
    },
    get: function(name) {
        return JSON.parse(localStorage.getItem(name))
    }
}
