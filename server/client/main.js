import { login, loginToken } from 'login';
import { switchPage, popUp, interaction } from 'ui';
import { eventTrigger } from 'filter';
import { editorEvent } from 'editor';
import { addEvent } from 'add'
if(localStorage.getItem('token') !== undefined) {
    setTimeout(loginToken, 200);
    switchPage(2);
} else {
    switchPage(0);
}
const loginButton = document.getElementById('login');
loginButton.addEventListener('click', login);

let nav = document.getElementsByClassName("nav-home");
for(let i = 0; i < nav.length; i++){
    nav[i].addEventListener("click", function(){switchPage("home")});
};
nav = document.getElementsByClassName("nav-search");
for(let i = 0; i < nav.length; i++){
    nav[i].addEventListener("click", function(){switchPage(4)});
}
nav = document.getElementsByClassName("nav-logout");
for(let i = 0; i < nav.length; i++){
    nav[i].addEventListener("click", function(){switchPage(0)});
}
nav = document.getElementsByClassName("nav-schema");
for(let i = 0; i < nav.length; i++){
    nav[i].addEventListener("click", function(){switchPage(3)});
}
nav = document.getElementsByClassName("nav-add");
for(let i = 0; i < nav.length; i++){
    nav[i].addEventListener("click", function(){switchPage(5)});
}

window.searchEvent = function(e,t){
    eventTrigger(e,t);
}
window.helpPop = function(n){
    popUp(n);
}
window.editorEvent = function(e,t){
    editorEvent(e,t);
}
window.addEvent = function(e,t){
    addEvent(e,t);
}
document.body.addEventListener("keypress", function(e){
    interaction();
});
document.body.addEventListener("click", function(e){
    interaction();
});