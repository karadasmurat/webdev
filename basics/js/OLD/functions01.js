
// 01: function decleration with keyword and name
function sayHi(){
    console.log("Hello there.");
}

// call the function using paranthesis
sayHi();

// 02: Function as a value, 
// Define a variable to hold a function
const greet = function(){
    console.log("hello world")
}

// 03: Arrow functions () => {}
// Drop "function" keyword, add arrow symbol
// When an arrow function has no parameters at all, 
// its parameter list is just an empty set of parentheses.
const af = () => {
    let msg = "This is an arrow function.";
    console.log(msg)
}
af();

//parameters
function add(a, b){
    return a+b;
}
let sum = add(2, 5);
console.log(sum);

//arrow with single parameter
const square1 = (x) => { return x * x };
// drop {} and return
const square2 = x => x * x;

console.log( square1(3) );
console.log( square2(4) );

//arrow with parameters
const mult = (x, y) => x*y;
console.log( mult(3, 5) );

/* 
JavaScript is extremely broad-minded about the number of arguments
you pass to a function. If you pass too many, the extra ones are ignored. 
If you pass too few, the missing parameters get assigned the value undefined. 
*/
const manyArgs = (a, b, c) => {

    console.log(`a: ${a}`);
    console.log(`b: ${b}`);

    //check if parameter is defined
    if( c == undefined){
        console.log("The 3rd parameter is undefined")
    }else{
        console.log(`c: ${c}`);
    }
}

manyArgs("MK");
manyArgs(1, 2, 3, 4 ,5);


const min = (a, b) => a<b ? a : b
console.log( min(1, 5) );

