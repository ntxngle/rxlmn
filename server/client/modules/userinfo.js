//loads user info into the page
let userinfo = {
    name: null,
    email: null
}
export function setUserInfo(user) {
    userinfo.name = user.name;
    userinfo.email = user.email;
}
export function applyUserInfo(page){
    let target = document.getElementsByClassName("page")[page];
    let names = target.getElementsByClassName("userinfo-name");
    for(let i = 0; i < names.length; i++){
        names[i].innerText = userinfo.name;
    }
    let emails = target.getElementsByClassName("userinfo-email");
    for(let i = 0; i < emails.length; i++){
        emails[i].innerText = userinfo.email;
    }
    console.log("[USERINFO] Applied to " + page +", " + names.length + " names and " + emails.length + " emails");
}