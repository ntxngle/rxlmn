const uiState = {
    page: 0,
    popup: null,
    popupLife: 0,
}
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
    uiState.page = page;
    document.getElementsByClassName("page")[page].classList.remove("hidden");
}
export function trueSwitch(page){
    switchPage(pagemap[page]);
}
export function popUp(n){
    uiState.popup = n;
    uiState.popupLife = 1;
    setInterval(function(){
        uiState.popupLife = 0;
    }, 100);
    let popups = document.getElementsByClassName("popup");
    for(let i = 0; i < popups.length; i++){
        popups[i].classList.add("hidden");
    }
    document.getElementsByClassName("popup")[n].classList.remove("hidden");
}
export function interaction(){
    if(uiState.popupLife == 1) return;
    if(uiState.popup !== null){
        document.getElementsByClassName("popup")[uiState.popup].classList.add("hidden");
        uiState.popup = null;
    }
}