import db from "db";
let loadedSchema = {};
let loadedSchemaName = "";
export function addEvent(x,t){
    if(x == "switchSchema"){
        db.ref("/schemas/"+t.value).once("value").then(function(snapshot){
            loadedSchema = snapshot.val();
            loadedSchemaName = t.value;
            renderSchema();
        });
    } else if(x == "submit"){
        let data = {};
        let inputs = document.getElementsByClassName("addForm")[0].getElementsByTagName("input");
        for(let i = 0; i < inputs.length; i++){
            if(inputs[i].value == ""){
                document.getElementById("add-validation").textContent = "Please fill in all fields";
                return;
            }
            if(inputs[i].type == "number" && isNaN(inputs[i].value)){
                document.getElementById("add-validation").textContent = "Invalid value for field type ("+inputs[i].name+")";
                return;
            }
            if(inputs[i].type == "email" && !inputs[i].value.match(/.+@.+\..+/)){
                document.getElementById("add-validation").textContent = "Invalid value for field type ("+inputs[i].name+")";
                return;
            }
            if(inputs[i].type == "tel" && !inputs[i].value.match(/^[0-9\-\+]+$/)){
                document.getElementById("add-validation").textContent = "Invalid value for field type ("+inputs[i].name+")";
                return;
            }
            if(inputs[i].type == "url" && !inputs[i].value.match(/^(http|https):\/\/.+$/)){
                document.getElementById("add-validation").textContent = "Invalid value for field type ("+inputs[i].name+")";
                return;
            }
            if(inputs[i].type == "number"){
                data[inputs[i].name] = parseInt(inputs[i].value);
            } else {
                data[inputs[i].name] = inputs[i].value;
            }
        }
        data["__type__"] = loadedSchemaName;
        db.ref("/partners").push(data);
        document.getElementById("add-validation").textContent = "Partner added";
        document.getElementsByClassName("addForm")[0].innerHTML = "";
    }
}
function renderSchema(){
    let div = document.getElementsByClassName("addForm")[0];
    div.innerHTML = "";
    for(let i in loadedSchema){
        let tmpd = document.createElement("div");
        tmpd.innerHTML = `<div><label>${i} (${loadedSchema[i]})</label><input type="${loadedSchema[i]}" name="${i}"></div>`;
        div.appendChild(tmpd);
    }
}