const filterhelp = {
    "==": "Equal to (Matches the exact value)",
    "!=": "Not equal to (Matches all values except the exact value)",
    ">": "Greater than (Matches all values greater than the value)",
    ">=": "Greater than or equal to (Matches all values greater than or equal to the value)",
    "<": "Less than (Matches all values less than the value)",
    "<=": "Less than or equal to (Matches all values less than or equal to the value)",
    "like": "Match pattern (?=any single character, *=any number of characters. Example: 'a?c*' matches 'abc', 'adc', 'aec', etc. but not 'abbc'). a* matches all values that start with 'a'. *a matches all values that end with 'a'. *a* matches all values that contain 'a'.",
    "!like": "Not match pattern (?=any single character, *=any number of characters. Example: 'a?c*' matches 'abc', 'adc', 'aec', etc. but not 'abbc'). a* matches all values that start with 'a'. *a matches all values that end with 'a'. *a* matches all values that contain 'a'.",
    "between": "Between (Matches all values between the two values. Seperate the two values with a comma)",
    "!between": "Not between (Matches all values except those between the two values seperated by a comma)",
    "exists": "Exists (Matches all values that are not null)",
    "!exists": "Does not exist (Matches all values that are null)"
};
let operations = [];
export function eventTrigger(e,t){
    if(e=="filterHelp"){
        document.getElementById("search-filterhelp").textContent = filterhelp[t.value];
    } else if(e=="filterSubmit"){
        let key = t.parentElement.getElementsByTagName("select")[0].value;
        let op = t.parentElement.getElementsByTagName("select")[1].value;
        let val = t.parentElement.getElementsByTagName("input")[0].value;
        if(val == "" && op != "exists" && op != "!exists"){
            document.getElementById("search-validation").textContent = "Please enter a value";
            return;
        }
        console.log("[FILTER] Key: "+key+" Op: "+op+" Val: "+val);
        operations.push({"key":key,"op":op,"val":val});
        showOperations();
    } else if("execute"){
        if(operations.length == 0){
            document.getElementById("search-validation").textContent = "No operations to execute";
            return;
        }
        document.getElementById("search-validation").textContent = "erm...something is POPPING !!  ! !! ! ! !";
    }
}
function showOperations(){
    let template = `<div class="search-operation"><button onclick="deleteSearch(%%%);">X </button><p>FILTER: $$$</p></div>`;
    let ops = document.getElementsByClassName("search-operation");
    for(let i = ops.length-1; i >= 0; i--){
        ops[i].parentElement.removeChild(ops[i]);
    }
    for(let i in operations){
        let op = document.createElement("div");
        op.innerHTML = template.replace("$$$", operations[i].key+" "+operations[i].op+" "+operations[i].val);
        op.innerHTML = op.innerHTML.replace("%%%", i);
        document.getElementById("search-searchop-insertafter").insertAdjacentElement("beforebegin",op.children[0]);
    }
    if(operations.length == 0){
        document.getElementById("search-searchop-insertafter").insertAdjacentHTML("beforebegin",`<div class="search-operation no-op"><button> </button><p>no operations. try adding one from below</p></div>`);
    }
}
window.deleteSearch = function(n){
    operations.splice(n,1);
    showOperations();
}