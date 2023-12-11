//unused
export function validate(input,level){
    if(level == "dbsafe"){
        return input.match(/^[a-zA-Z0-9_]*$/);
    }
}