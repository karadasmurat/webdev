const fruits = ["Apple", "Banana", "Strawberry" ];

fruits.push("Melon");

//const list = fruits.map( lister );
const list = fruits.map( val => "<p>" + val + "</p>");

console.log(list);

function lister(val, index){
    return `<p id=${index}>${val}</p>`;
}