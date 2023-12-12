//interactive stuff for filter page
import db from "db";
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
export async function eventTrigger(e,t){
    if(e=="filterHelp"){
        //show help for selected operator
        document.getElementById("search-filterhelp").textContent = filterhelp[t.value];
    } else if(e=="filterSubmit"){
        //add filter to stack
        let key = t.parentElement.getElementsByTagName("select")[0].value;
        let op = t.parentElement.getElementsByTagName("select")[1].value;
        let val = t.parentElement.getElementsByTagName("input")[0].value;
        if((key+val+op).indexOf("placeholder") != -1){
            document.getElementById("search-validation").textContent = "Please select a key, operator, and value";
            return;
        }
        if(val == "" && op != "exists" && op != "!exists"){
            document.getElementById("search-validation").textContent = "Please enter a value";
            return;
        }
        operations.push({"key":key,"op":op,"val":val});
        showOperations();
    } else if(e=="execute"){
        //execute filter stack
        if(operations.length == 0){
            document.getElementById("search-validation").textContent = "No operations to execute";
            return;
        }
        document.getElementById("search-validation").textContent = "executing search";
        let total = await db.query("/partners");
        //uses the db.query() function to filter and sort the data
        for(let i in operations){
            if(operations[i].op=="sort"){
                total = await total.sort(operations[i].key,operations[i].val);
            } else {
                total = await total.filter(operations[i].key,operations[i].op,operations[i].val);
            }
        }
        total.get().then(function(snapshots){    
            let tmp = [];
            for(let i in snapshots){
                tmp.push(snapshots[i].val());
            }
            document.getElementById("search-validation").textContent = "Found "+tmp.length+" results";
            console.log(tmp);
            //show results
            document.getElementById("searchresults").innerHTML = "";
            for(let i in tmp){
                let tmpd = document.createElement("div");
                for(let k in tmp[i]){
                    tmpd.innerHTML += `<div><label>${k}</label><p>${tmp[i][k]}</p></div>`;
                }
                document.getElementById("searchresults").appendChild(tmpd);
            }

        });
    } else if(e=="sortSubmit"){
        //add sort to stack
        let key = t.parentElement.getElementsByTagName("select")[0].value;
        let val = t.parentElement.getElementsByTagName("input")[0].checked ? true : false;
        if(key == "placeholder"){
            document.getElementById("search-validation").textContent = "Please select a key";
            return;
        }
        if(key == ""){
            document.getElementById("search-validation").textContent = "Please select a key";
            return;
        }
        console.log("[SORT] Key: "+key+" Op: "+"sort", "Val: "+val);
        operations.push({"key":key,"op":"sort","val":val});
        showOperations();
    }
}
function showOperations(){
    //render operations stack
    let template = `<div class="search-operation"><button onclick="deleteSearch(%%%);"> </button><p>FILTER: $$$</p></div>`;
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
//should be in main.js whatever
window.deleteSearch = function(n){
    operations.splice(n,1);
    showOperations();
}