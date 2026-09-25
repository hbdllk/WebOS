import * as $ from "./utils.js";
import * as nav from "./nav.js";
import * as windows from "./windows.js";

const icon = (app) => {
    const iconContent = `
        <div class="icon-area">
           <img src="./src/images/nav/${app.id}.svg" alt="${app.name}" class="icon-img">
        </div>`;
    const icon = $.createElement({
        tag: "button",
        cls: "icon",
        id: app.id,
        content: iconContent
    });
    
    icon.addEventListener('click', ()=>{ windows.open(app) });
    return icon
};

export function create(app) {
    nav.base.appendChild(icon(app));
};

export function remove(name) {
    const appList = nav.base.querySelectorAll('.icon');
    appList.forEach(el => {
        if (el.id !== name) {
            return
        } else {
            el.remove();
        }
    });
};