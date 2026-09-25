import * as nav from "./scripts/nav.js";
import * as icons from "./scripts/icons.js";
import * as windows from "./scripts/windows.js";
import * as $ from "./scripts/utils.js";

window.addEventListener('DOMContentLoaded', ()=>{
    nav.create();
    nav.center();
});

window.addEventListener('resize', ()=>{
    nav.seek();
});
