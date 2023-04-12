/*

to run:
$ node basics.js

In 1995, JavaScript was created by a Netscape developer named Brendan Eich.
First, its name was Mocha. And then, its name was changed to LiveScript.
Netscape decided to change LiveScript to JavaScript to leverage Java’ s fame, which was popular.

syntax
Add a semicolon at the end of each executable statement:

Identifiers
An identifier is a name you choose for variables, parameters, functions, classes, etc.
An identifier name starts with a letter (a - z, or A - Z), an underscore (_), or a dollar sign($) and 
is followed by a sequence of characters including (a - z, A - Z), numbers(0 - 9), underscores(_), and dollar signs($).

The JavaScript syntax defines two types of values:
 - Fixed values - Literals.
 - Variable values - Variables


 JavaScript uses 3 keywords to declare variables:
  - var, (1995 to 2015)
  - let, (If you think the value of the variable can change, use let.)
  - const (If you want a general rule: always declare variables with const.)
 
 
 The "let" and "const" keywords was introduced in ES6(2015). 
 There are differences between "var" and "let". And it’ s a good practice to use the "let" keyword to declare variables.

        const price1 = 5;
        const price2 = 6;
        let total = price1 + price2;


The keyword const is a little misleading - It does not define a constant value. 
It defines a constant reference to a value.

Because of this you can NOT:
    Reassign a constant value
    Reassign a constant array
    Reassign a constant object
But you CAN:
    Change the elements of constant array
    Change the properties of constant object

A const variable cannot be reassigned - Always declare a variable with
const when you know that the value should not be changed.
JavaScript const variables must be assigned a value when they are declared:

        const PI = 3.141592653589793;
        PI = 3.14; // This will give an error


An "undefined" variable is a variable that has been declared but has not been initialized with a value.

    let message;
    console.log(message); // undefined


JavaScript Datatypes
----------------------

    1. String: 
    Text, written within double or single quotes:
    
    2. Number: 
    Numbers are written with or without decimals.
    Javascript numbers are always one type: double(64 - bit floating point).
    
    3. Bigint: 
    A new datatype(ES2020) that can be used to store integer values that are too big to be represented by a normal JavaScript Number.
    
    4. Boolean
    Booleans can only have two values: true or false.

    5. Undefined
    In JavaScript, a variable without a value, has the value undefined.

    6. Null

    7. Symbol

    8. JavaScript Arrays
    JavaScript arrays are written with square brackets, and array items are separated by commas:
        const cars = ["Saab", "Volvo", "BMW"];
    Array indexes are zero - based, which means the first item is[0].

    9. JavaScript objects
    In JavaScript, an object is a collection of properties, where each property is defined as a key - value pair.

    The following example defines an empty object using the object literal syntax:

        let emptyObject = {};

        const person = {
            firstName: "John",
            lastName: "Doe",
            age: 50,
            eyeColor: "blue"
        };

    
The global NaN property is a value representing Not-a-Number.
 - Parsing numbers - failed number conversion (e.g.explicit ones like parseInt("blabla"), Number(undefined), or implicit ones like Math.abs(undefined))
 - Math operation where the result is not a real number(e.g.Math.sqrt(-1))
 - Indeterminate form(e.g.0 * Infinity, 1 ** Infinity, Infinity / Infinity, Infinity - Infinity)
 - Using NaN or undefined as an operand(e.g .7 ** NaN, undefined * 2, 7 * "blabla", )— this means NaN is contagious
 
 Testing against NaN
 To tell if a value is NaN, use isNaN() to most clearly determine whether a value is NaN

 Note that JavaScript Types are Dynamic. 
 This means that the same variable can be used to hold different data types:
    
        let x;      // Now x is undefined
        x = 5;      // Now x is a Number
        x = "John"; // Now x is a String

You can use the JavaScript typeof operator to find the type of a JavaScript variable.


 let carName;   // A variable declared without a value will have the value undefined

 Type Conversion:
 ------------------
 In JavaScript, parseInt() function does not throw an exception when it fails to convert a string to an integer.
 Instead, it returns NaN(Not a Number) to indicate that the conversion failed.
 So, you don 't need to use try/catch block to handle the conversion failure with parseInt(). 
 You can simply check the returned value against NaN to determine whether the conversion was successful.

    const input = 'X100';
    const num = parseInt(input);

    // set num to 0 if parsing failed
    if (isNaN(num)) {
        num = 0;
    }

 console.log(num); // 0

 JavaScript Operators
 ----------------------

  * The Assignment Operator (not an equal to operator)
        x = x + 5

  * Arithmetic operators
        + - * / %

  * Comparison Operators 
        Note that comparing data of different types may give unexpected results.

  * Logical Operators 
        (&& (and), || (or), ! (not))

  * Conditional(Ternary) Operator: 
        // assign a variable using ternary operator
        let voteable = (age < 18) ? "Too young" : "Old enough";

  * The Nullish Coalescing Operator (??)
        let name = null;
        let result = name ?? "missing";


 Expressions
 An expression is a combination of values, variables, and operators, which computes to a value.

 JavaScript uses the Unicode character set.
 All JavaScript identifiers are case sensitive.

Arrays
--------

// To declare an array, you use the following syntax:
let items = [];

// To declare an array with some initial elements:
let items = [1, 2, 3];


 Functions
 ---------
 To declare a function, you use the function keyword.

    function divide(a, b) {
        if (b == 0) {
            throw 'Division by zero';
        }
        return a / b;
    }

*/


// Camel Case
let myVariableName = "Harry"
// Pascal Case
let MyVariableName = "Hermione"
// Snake Case
let my_variable_name = "Ron"

// An undefined variable is a variable that has been declared but has not been initialized with a value.
let message;
console.log(message); // undefined

// Create a variable named score and assign the value 50 to it.
let score = 50

// The numeric separator fixes this readability issue as follows:
// const budget = 1_000_000_000;

// You can declare many variables in one statement.
// compare to python: x, y, z = "Orange", "Banana", "Cherry"
let person = "John Doe",
    carName = "Volvo",
    price = 200;

let x = 10;
let y = 5;

console.log(x * y);

// adding a string and a number
let year = "1998";
console.log(year + 1); // 19981

// The global NaN property is a value representing Not-A-Number.
console.log(200 + 0 / 0); // NaN

comparisonOperators();
console.log(`isEven(8): ${isEven(8)}`)

booleanBasics();
stringBasics();

//Conditional Execution
let num = 51;
if (num % 2 == 0) {
    console.log(num + " is even.")
} else {
    console.log(num + " is odd.")
}

// Conditional (ternary) operator
// condition ? exprIfTrue : exprIfFalse
let result = num > 85 ? "pass" : "fail";
console.log("Score: " + num + " Result: " + result)

//Loops
for (let i = 0; i < 5; i++) {
    //console.log(`For counter: ${i}`);
}

let j = 0;
while (j < 5) {
    //console.log(`While counter: ${j}`);
    j++;
}

function isEven(x) {
    return x % 2 == 0;
}

function conversionBasics() {

    /*  
    In JavaScript, parseInt() function does not throw an exception when it fails to convert a string to an integer.
    Instead, it returns NaN(Not a Number) to indicate that the conversion failed.
    So, you don 't need to use try/catch block to handle the conversion failure with parseInt(). 
    You can simply check the returned value against NaN to determine whether the conversion was successful.
    */
    const input = 'X100';
    const num = parseInt(input);

    // set num to 0 if parsing failed
    if (isNaN(num)) {
        num = 0;
    }
}

function comparisonOperators() {
    /* 
    Notice == vs === 
    === compareequal value and equal type  
    */

    console.log("Comparison Operators");

    let x = 5;

    // note template literals with backticks(`${expression}`) vs. pythons fstring (f"")
    console.log(`x= ${x}, typeof (x): ${typeof (x)}`);

    if (x == 5) { // true
        console.log('x == 5');
    }

    if (x == "5") { // true
        console.log('x == "5"');
    }

    if (x === 5) { // true
        console.log("x === 5")
    }

    if (x === "5") { // false
        console.log('x === "5"')
    }
}

function booleanBasics() {
    console.log("Boolean Basics");
    console.log("--------------");

    gameOver = false;
    console.log(typeof (gameOver)); // "boolean"

    // JavaScript allows values of other types to be converted into boolean values of true or false.
    console.log(Boolean('Hi')); // true (non-empty string)
    console.log(Boolean('')); // false (empty string)

    console.log(Boolean(20)); // true
    console.log(Boolean(Infinity)); // true
    console.log(Boolean(-1)); // true
    console.log(Boolean(0)); // false
}

function stringBasics() {
    /*
    In JavaScript, a string is a sequence of zero or more characters.
    A string literal begins and ends with either a single quote(') or a double quote (").
    JavaScript strings are immutable.
    */

    console.log("String Basics");
    console.log("------------");

    let greeting = 'Hi';

    // Accessing characters
    //[] notation with the zero - based index.
    // length property returns the length of the string.
    console.log(greeting[greeting.length - 1]); // i

    // It's important to note that trying to access an index that is out of bounds for a string 
    // (i.e., less than 0 or greater than or equal to the string's length) will return undefined.
    console.log(greeting[999]); // undefined

    let s = 'JavaScript';
    s[0] = '$'; // strings are immutable..
    console.log(s) // JavaScript

    // To concatenate two or more strings, you use the + operator:
    let name = 'John';
    let str = 'Hello ' + name;

    console.log(str); // "Hello John"

    // Converting values to string
    // Option 1
    let n = 333;
    let str0 = String(n);
    let str1 = "" + n;
    let str2 = n.toString();
    console.log(str0);
    console.log(typeof (str0));
    console.log(str0);
    console.log(typeof (str1));
    console.log(str0);
    console.log(typeof (str2));




}

function arrayBasics() {

    console.log("Array Basics");
    console.log("------------");

    // To declare an array, you use the following syntax:
    let myArray = [];

    // To declare an array with some initial elements:
    let items = [1, 2, 3];

    // We can access the number of elements in the items array through its length property:
    console.log(items.length); // 3

    // To iterate over the elements of the items array, 
    // Option 1
    for (let i = 0; i < items.length; i++) {
        console.log(items[i]);
    }

    // Option 2 - for... of loop in ES6:
    for (let item of items) {
        console.log(item);
    }

}