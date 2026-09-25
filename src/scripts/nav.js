import * as icons from "./icons.js";
import { templates } from "./templates.js";

const NAV = document.getElementById("nav");
export const base = NAV;

export function create() {
    icons.create(templates.home)
    icons.create(templates.projects)
    icons.create(templates.contacts)
    icons.create(templates.terminal)
    icons.create(templates.youtube)
}

export function center() {
    let navCompStyles = window.getComputedStyle(NAV);

    NAV.style.left = `calc(50vw - (${navCompStyles.getPropertyValue("width")} / 2))`;
}

export function hide() {
    NAV.classList.add("nav-hidden");
}

export function seek() {
    NAV.classList.remove("nav-hidden");
}