const pagemap = {
    "login": 0,
    "home": 1,
    "verifying": 2,
    "search": 4,
    "schema": 3,
};
import { applyUserInfo } from "userinfo";
export function switchPage(page){
    let pages = document.getElementsByClassName("page");
    for(let i = 0; i < pages.length; i++){
        pages[i].classList.add("hidden");
    }
    if(typeof page === "string") page = pagemap[page];
    applyUserInfo(page);
    document.getElementsByClassName("page")[page].classList.remove("hidden");
}
export function trueSwitch(page){
    switchPage(pagemap[page]);
}