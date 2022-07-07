const num={...'hello'};
function sum(...a){
    return a.reduce(((b,c) => b+c));
}