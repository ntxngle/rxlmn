//common ui functions
const uiState = {
    page: 0,
    popup: null,
    popupLife: 0, //immidiate close prevention
}
//select option cache
let mcache = {};
const pagemap = {
    "login": 0,
    "home": 1,
    "verifying": 2,
    "search": 4,
    "schema": 3,
};
import { applyUserInfo } from "userinfo";
import db from "db";
export function switchPage(page){
    //hide all pages, make the one we want visible
    let pages = document.getElementsByClassName("page");
    for(let i = 0; i < pages.length; i++){
        pages[i].classList.add("hidden");
    }
    if(typeof page === "string") page = pagemap[page];
    applyUserInfo(page);
    updateDynamicOptions(page);
    uiState.page = page;
    document.getElementsByClassName("page")[page].classList.remove("hidden");
}
export function trueSwitch(page){
    //human readable page names
    switchPage(pagemap[page]);
}
export function popUp(n){
    //show popup n
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
    //close popup if clicked/typed
    if(uiState.popupLife == 1) return;
    if(uiState.popup !== null){
        document.getElementsByClassName("popup")[uiState.popup].classList.add("hidden");
        uiState.popup = null;
    }
}
function updateDynamicOptions(page){
    //replace dynamic options with data from db
    if(page<3) return; //ignore ones that never have it + load before login
    //mcache is a cache for the options, so we don't have to load them every time
    let options = document.getElementsByClassName("page")[page].getElementsByClassName("dboptions");
    for(let i=0;i<options.length;i++){
        if(options[i].getAttribute("data-name") == "allschemas"){
            if(mcache["allschemas"]){
                options[i].innerHTML = mcache["allschemas"];
                console.log("[UI] allschemas cache hit");
                continue;
            }
            db.ref("/schemas").reflect("info",{ child_limit: 200, child_skip: 0 }).then(info => {
                let html = "<option value=\"placeholder\" selected disabled>Select Schema</option>";
                info=info.children.list;
                for(let i in info){
                    html += "<option>"+info[i].key+"</option>";
                }
                options[i].innerHTML = html;
                mcache["allschemas"] = html;
            });
        } else if(options[i].getAttribute("data-name") == "allkeys"){
            if(mcache["allkeys"]){
                options[i].innerHTML = mcache["allkeys"];
                console.log("[UI] allkeys cache hit");
                continue;
            }
            db.ref("/schemas").get().then(schemas => {
                let html = "<option value=\"placeholder\" selected disabled>Select Key</option>";
                schemas = schemas.val();
                for(let i in schemas){
                    for(let k in schemas[i]){
                        html += "<option>"+k+"</option>";
                    }
                }
                options[i].innerHTML = html;
                mcache["allkeys"] = html;
            });
        }
    }
}