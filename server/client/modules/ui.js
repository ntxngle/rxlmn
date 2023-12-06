export function switchPage(page){
    let pages = document.getElementsByClassName("page");
    for(let i = 0; i < pages.length; i++){
        pages[i].classList.add("hidden");
    }
    document.getElementsByClassName("page")[page].classList.remove("hidden");
}