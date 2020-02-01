export const isNull = (data) => {
    if (data == "undefined" || data == "null" || data == null || data == undefined){
        return true;
    } else {
        return false;
    }
}