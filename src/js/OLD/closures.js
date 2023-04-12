function outerFunction(){

    console.log("OUTER.")

    let x = 10,
        y = 20;

    function inner(){
        let sum = x + y;
        console.log( `INNER - Sum of ${x} and ${y} is: ${sum}` );
    }

    //call inner
    // inner();

    // return inner function, without executing it (no paranthesis)
    return inner;
}

// console.log(outer); // f
// console.log(inner); // undefined.


// call function outer
// outer();

// execute outer function, to get a reference to the inner function (without executing inner):
let myOuter = outerFunction();

// execute inner function
myOuter();