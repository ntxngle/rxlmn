import db from "db";
export function importSchma(name,meta,ob){
    loadedSchema = ob;
    document.getElementsByClassName("schemaeditor")[0].getElementsByTagName("h1")[0].textContent = name;
    document.getElementsByClassName("schemaeditor")[0].getElementsByTagName("p")[0].textContent = meta;
    loadSchema();
}
export function editorEvent(e,t){
    if(e=="editSchema"){
        if(t.value=="Select Schema"){
            return;
        }
        db.ref("schemas/"+t.value).once("value").then((snap)=>{
            if(snap.val() == null){
                alert("Schema not found");
                return;
            }
            importSchma(t.value,"schema",snap.val());
        });
    } else if(e == "new"){
        let name = window.prompt("New Schema Name");
        if(name == null) return;
        if(name.length < 3){
            alert("Schema name must be at least 3 characters long");
            return;
        }
        if(name.length > 20){
            alert("Schema name must be less than 20 characters long");
            return;
        }
        if(name.match(/[^a-zA-Z0-9]/g)){
            alert("Schema name must be alphanumeric (No spaces)");
            return;
        }
        importSchma(name,"Newly created",{"name":"string"});
    } else if(e == "saveSchema"){
        if(Object.keys(loadedSchema).length == 0){
            document.getElementById("schema-validation").textContent = "Schema must have at least one key";
            return 0;
        }
        let schema = {};
        let inputs = document.getElementsByClassName("schema")[0].getElementsByTagName("input");
        let selects = document.getElementsByClassName("schema")[0].getElementsByTagName("select");
        for(let i = 0; i < inputs.length; i++){
            if(inputs[i].value.length < 3){
                document.getElementById("schema-validation").textContent = "Key name must be at least 3 characters long";
                return 0;
            }
            if(inputs[i].value.length > 20){
                document.getElementById("schema-validation").textContent = "Key name must be less than 20 characters long";
                return 0;
            }
            if(inputs[i].value.match(/[^a-zA-Z0-9]/g)){
                document.getElementById("schema-validation").textContent = "Key name must be alphanumeric (No spaces)";
                return 0;
            }
            schema[inputs[i].value] = selects[i].value;
        }
        console.log(schema);
        loadedSchema = schema;
        db.ref("schemas/"+document.getElementsByClassName("schemaeditor")[0].getElementsByTagName("h1")[0].textContent).set(loadedSchema);
        document.getElementById("schema-validation").textContent = "Saved as \"" + document.getElementsByClassName("schemaeditor")[0].getElementsByTagName("h1")[0].textContent+"\"";
        return 1;
    } else if(e == "close"){
        console.log("do hit");
        delete loadedSchema[t];
        loadSchema();
    } else if(e == "add"){
        if(!editorEvent("saveSchema")) return;
        loadedSchema["new"+Math.round(Math.random()*100)] = "text";
        loadSchema();
    }
}
let loadedSchema = {};
let types = ["text","number","date","email","tel","url"];
let optlist = "";
for(let i in types){
    optlist += `<option value="${types[i]}">${types[i]}</option>`;
}
function loadSchema(){
    let br = document.createElement("br");
    let template = `<button onclick="editorEvent('close','$$$');"></button><span></span><input type="text" placeholder="key name" value="%%%"><span>&nbsp;:&nbsp;</span><select>${optlist}</select><br>`
    document.getElementsByClassName("schema")[0].innerHTML = `<button onclick="editorEvent('add');">+</button>`;
    for(let i in loadedSchema){
        let op = document.createElement("div");
        let inh = template.replace("%%%", i);
        inh = inh.replace("$$$", i);
        op.innerHTML = inh;
        op.getElementsByTagName("select")[0].value = loadedSchema[i];
        document.getElementsByClassName("schema")[0].prepend(op);
    }
}