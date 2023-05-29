/*

to run:
$ node basics.js

on a browser:
<script src = "js/hello.js" > < /script>

In 1995, JavaScript was created by a Netscape developer named Brendan Eich.
First, its name was Mocha. And then, its name was changed to LiveScript.
Netscape decided to change LiveScript to JavaScript to leverage Java’ s fame, which was popular.
After its adoption outside of Netscape, a standard document was written to describe the way the JavaScript language should work so that the various pieces of software that claimed to support JavaScript were actually talking about the same language.
This is called the ECMAScript standard, after the Ecma International organization that did the standardization.

syntax
Add a semicolon at the end of each executable statement:

Expression vs Statement
-----------------------
 A fragment of code that produces a value is called an "expression".
 If an expression corresponds to a sentence fragment, a JavaScript statement corresponds to a full sentence.
 A program is a list of statements.


 Bindings
---------
 How does a program keep an internal state ? How does it remember things ?
 To catch and hold values, JavaScript provides a thing called a binding, or variable:

     let caught = 5 * 5;

After a binding has been defined, its name can be used as an expression.
When a binding points at a value, that does not mean it is tied to that value forever.
The = operator can be used at any time on existing bindings to disconnect them from their current value and have them point to a new one:

    let mood = "light";
    mood = "dark";

Two bindings can refer to the same value.


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
    Text, written within double or single quotes.
    strings are "immutable". When you take a specific string value, that value will always remain the same. The text inside it cannot be changed.
    If you have a string that contains "cat", it is not possible for other code to change a character in your string to make it spell "rat".
    
    2. Number: 
    Numbers are written with or without decimals.
    Javascript numbers are always one type: double(64 - bit floating point).
    There are three special values in JavaScript that are considered numbers but don’ t behave like normal numbers:
    The first two are Infinity and - Infinity, which represent the positive and negative infinities.
    
    The third is NaN, stands for“ not a number”, even though it is a value of the number type.
        Parsing numbers - failed number conversion(e.g.explicit ones like parseInt("blabla"), Number(undefined), or implicit ones like Math.abs(undefined)) -
        Math operation where the result is not a real number(e.g.Math.sqrt(-1)) -
        Indeterminate form(e.g .0 * Infinity, 1 ** Infinity, Infinity / Infinity, Infinity - Infinity) -
        Using NaN or undefined as an operand(e.g .7 ** NaN, undefined * 2, 7 * "blabla", )— this means NaN is contagious

    Testing against NaN
    To tell
    if a value is NaN, use isNaN() to most clearly determine whether a value is NaN
    
    3. Bigint: 
    A new datatype(ES2020) that can be used to store integer values that are too big to be represented by a normal JavaScript Number.
    
    4. Boolean
    Booleans can only have two values: true or false.

    5. Empty values
    There are two special values, written null and undefined, that are used to denote the absence of a meaningful value.
    They are themselves values, but they carry no information.
    
        5.1 undefined 
        In JavaScript, a variable without a value, has the value undefined.
        Many operations in the language that don’ t produce a meaningful value yield undefined simply because they have to yield some value.

        5.2 null

    6. Symbol

    7. JavaScript Arrays
    JavaScript arrays are written with square brackets, and array items are separated by commas:
        const cars = ["Saab", "Volvo", "BMW"];
    Array indexes are zero - based, which means the first item is[0].

    8. JavaScript objects
    In JavaScript, an object is a collection of properties, where each property is defined as a key - value pair.

    The following example defines an empty object using the object literal syntax:

        let emptyObject = {};

        const person = {
            firstName: "John",
            lastName: "Doe",
            age: 50,
            eyeColor: "blue"
        };

    


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
        + - * / % **

  * Comparison Operators 
    A comparison operator compares its operands and returns a logical value based on whether the comparison is true.
    In most cases, if the two operands are not of the same type, JavaScript attempts to convert them to an appropriate type
    for the comparison. Note that comparing data of different types may give unexpected results.

    Equals                  : a == b
    Not Equals              : a != b
    Strict Equal            : a === b
    Strict Not Equal        : a !== b
    Less than               : a < b
    Less than or equal to   : a <= b
    Greater than            : a > b
    Greater than or equal to: a >= b

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
------

// To declare an array, you use the following syntax:
let items = [];

// To declare an array with some initial elements:
let items = [1, 2, 3];

// create an array with nine elements and sets each of them to null. 
Array(9).fill(null) 

    // Array destructuring
    // Basic variable assignment
    // on the left-hand side of the assignment to define what values to unpack from the sourced variable.
    const x = [1, 2, 3, 4, 5];
    const [y, z] = x;
    console.log(y); // 1
    console.log(z); // 2



 Functions
 ---------
 To declare a function, you use the function keyword.

    function divide(a, b) {
        if (b == 0) {
            throw 'Division by zero';
        }
        return a / b;
    }

this
----

A function 's this keyword behaves a little differently in JavaScript compared to other languages. 
In most cases, the value of this is determined by how a function is called(runtime binding).

    const test = {
        prop: 333,
        getProp: function () {
            return this.prop;
        },
    };

    console.log(test.getProp()); // 333


TRY-CATCH
---------
The try...catch statement is comprised of a try block and either a catch block, a finally block, or both.
The code in the try block is executed first, and if it throws an exception, the code in the catch block will be executed.
The catch-block specifies an identifier(e in the example above) that holds the value of the exception; this value is only available in the scope of the catch - block.
The code in the finally block will ALWAYS be executed before control flow exits the entire construct.

Syntax:

    try {
        tryStatements
    } catch (exceptionVar) {
        catchStatements
    } finally {
        finallyStatements
    }


*/

printBasics();

// Camel Case
let myVariableName = "Harry";
// Pascal Case
let MyVariableName = "Hermione";
// Snake Case
let my_variable_name = "Ron";

// An undefined variable is a variable that has been declared but has not been initialized with a value.
let message;
console.log(message); // undefined

// Create a variable named score and assign the value 50 to it.
let score = 50;

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

// input_basics();
// operatorBasics();
// booleanBasics();
// stringBasics();
// arrayBasics();
array_higherOrder();
// objectBasics(); // moved to objects.js
// conditionalExprBasics();
// loopBasics();
// friendlyDivider(10, 6);
// console.log(`isEven(8): ${isEven(8)}`);

// randomBasics();
errorBasics();

function errorBasics() {
  console.log("Error Basics");
  console.log("------------");

  try {
    nonExistentFunction();
  } catch (e) {
    console.error("Houston, we have a problem!");
    //console.error(e); // Expected output: ReferenceError: nonExistentFunction is not defined
  }
}

function input_basics() {
  console.log("Input Basics");
  console.log("------------");

  let name = prompt("What is your name? ");
  console.log(`Hello, ${name}!`);
}

function loopBasics() {
  console.log("Loop Basics");
  console.log("------------");

  // for loop
  for (let i = 0; i < 5; i++) {
    //console.log(`For counter: ${i}`);
  }

  // looping over arrays
  // Accessing every item
  // To iterate over the elements of the items array
  const people = ["Potter", "Weasley", "Hermione", "Malfoy"];

  // Option 1
  for (let i = 0; i < people.length; i++) {
    console.log(`people[${i}]: ${people[i]}`);
  }

  // Option 2 - for... of loop in ES6:
  for (let person of people) {
    console.log(person.toUpperCase());
  }

  // Nested Loop
  // Print a rectangle using *
  const height = 3;
  const width = 5;
  for (let h = 0; h < height; h++) {
    row = "";
    for (let w = 0; w < width; w++) {
      row += "* ";
    }
    console.log(row);
  }

  // iterate multidimensional array:
  const countries = [
    [90, "Turkey", "Ankara"],
    [44, "United Kingdom", "London"],
    [1, "United States", "Washington"],
    [81, "Japan", "Tokyo"],
    [86, "China", "Beijing"],
  ];
  for (let country of countries) {
    for (let prop of country) {
      console.log(prop);
    }
    // console.log(c[2]);
  }

  // while loop
  let j = 0;
  while (j < 5) {
    console.log(`While counter: ${j}`);
    j++;
  }

  // esp when you do not exactly know in advance how many times to loop
  // keep rolling untill you get a 1:
  let gameOver = false;
  while (!gameOver) {
    roll = Math.floor(Math.random() * 6) + 1;
    console.log("Rolling dice: " + roll);
    gameOver = roll == 1 ? true : false;
  }
}

function conditionalExprBasics() {
  //Conditional Execution
  let score = 89.5;
  let grade = "NA";
  if (score >= 90) {
    grade = "Exceeding Expectations";
  } else if (score >= 70) {
    grade = "Successful";
  } else {
    grade = "Failed";
  }
  console.log(`Your score: ${score} : ${grade}`);

  let num = 51;
  if (num % 2 == 0) {
    console.log(num + " is even.");
  } else {
    console.log(num + " is odd.");
  }

  // Conditional (ternary) operator
  // condition ? exprIfTrue : exprIfFalse
  let result = num > 85 ? "pass" : "fail";
  console.log("Score: " + num + " Result: " + result);
}

function printBasics() {
  let x = 5;

  // note template literals with backticks and dollar sign (`${}`) vs. pythons fstring (f"{}")
  console.log(`x= ${x}, typeof (x): ${typeof x}`);

  let qty = 5;
  let price = 2;
  console.log(`Total bill: $${qty * price}`); // Total bill: $10

  // browser alert popup
  // alert("hello, there");
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
  const input = "X100";
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
  console.log("--------------------");

  console.log(`1 == '1'  : ${1 == "1"}`); //true !!
  console.log(`1 === '1' : ${1 === "1"}`); //false
}

function operatorBasics() {
  console.info("Operator Basics");
  console.info("--------------");

  // Mathematical Operators: + - * / / / ** %
  let x = 10;
  let y = 3;
  let z = 2.0;
  console.log(`${x}, ${y}, ${z}`); // 10, 3, 2
  console.log(`${x + z}`); // 12
  console.log(`${x / y}`); // 3.3333333333333335
  console.log(`${x % y}`); // 1 Modulus(returns the remainder of the division)
  console.log(`${x ** y}`); // 1000 Exponentiation

  // Assignment Operators
  x = 55;
  x += 1; // x = x + 1

  // The increment (++) operator increments (adds one to) its operand and returns the value before or after the increment, depending on where the operator is placed.
  let a = 3;
  const b = ++a;
  const c = a++;

  console.log(`Increment operator results: a:${a}, b:${b}, c:${c}`); // a:5, b:4, c:4

  comparisonOperators();

  // Logical Operators: and, or, not
  if (!(5 < x && x < 10)) {
    console.log("Not Between 5-10.");
  } else {
    print("Between 5-10.");
  }
}

function friendlyDivider(a, b) {
  if (b == 0) {
    throw new Error("Division by zero.");
  }

  quotient = Math.floor(a / b);
  remainder = a % b;

  console.log(
    `${a} divided by ${b} is ${quotient} with ${remainder} remaining`
  );
}

function booleanBasics() {
  console.log("Boolean Basics");
  console.log("--------------");

  gameOver = false;
  console.log(typeof gameOver); // "boolean"

  // In JavaScript, a truthy value is a value that is considered true when encountered in a Boolean context.
  // Note that all values are truthy except false, 0, -0, 0n, ""(empty str), null, undefined, and NaN.
  // JavaScript allows values of other types to be converted into boolean values of true or false.
  console.log(Boolean("Hi")); // true (non-empty string)
  console.log(`Boolean(''): ${Boolean("")}`); // false (empty string)
  console.log(`Boolean('false'): ${Boolean("false")}`); // true (string)

  console.log(`Boolean(20): ${Boolean(20)}`); // true
  console.log(`Boolean(Infinity): ${Boolean(Infinity)}`); // true
  console.log(`Boolean(-1): ${Boolean(-1)}`); // true
  console.log(`Boolean(0): ${Boolean(0)}`); // false

  //Since an empty string behaves as falsey, you can test whether the string has content
  some_str = "";
  if (!some_str) {
    console.log("Missing str value");
  }
}

function stringBasics() {
  /*
    In JavaScript, a string is a sequence of zero or more characters.
    A string literal begins and ends with either a single quote(') or a double quote (").
    JavaScript strings are immutable.
    */

  console.log("String Basics");
  console.log("------------");

  // Creating strings
  // Strings can be created as primitives, from string literals, or as objects, using the String() constructor:

  // String variables can be declared either by using single or double quotes:
  let name = "Harry"; // creates a string primitive
  let house = "Gryffindor";
  const lastname = new String("Potter"); // creates a String object

  console.log(`${name}: ${typeof name}`); // Harry: string

  // String concatenation - operator + is overloaded
  let z = name + "," + house; // Harry, Gryffindor
  console.log(z);

  // you can use the backslash character (\) at the end of each line to indicate that the string will continue on the next line.
  const longString =
    "This is a very long string which needs to wrap across multiple lines because otherwise my code is unreadable. \
Make sure there is no space or any other character after the backslash(except for a line break), otherwise it will not work. \
If the next line is indented, the extra spaces will also be present in the string 's value.";

  console.log(longString);

  // You can insert a variable into a string using template literals
  std = `Hi! This is ${name}, from ${house}.`; // Hi! This is Harry, from Gryffindor.
  console.log(std);

  // length of a string
  console.log(`The length of string ${name} is ${name.length}`);

  // number of digits, as the length of a string
  x = 123456;
  // option 1 toString() of number
  console.log("#digits: " + x.toString().length);
  // option 2 casting(think of it as a constructor)
  x_str = String(x);
  digits = x_str.length;
  console.log(`${x} ${x_str} ${digits}`); // x = 123456 x_str = '123456' digits = 6

  // Accessing characters
  // A string is a sequence of characters. You can access the characters one at a time with the subscript operator: string[n]
  //[] notation with the zero - based index.
  // length property returns the length of the string.
  word = "JavaScript";
  console.log("First char:", word[0], "Last char:", word[word.length - 1]);

  // It's important to note that trying to access an index that is out of bounds for a string
  // (i.e., less than 0 or greater than or equal to the string's length) will return undefined.
  console.log(word[999]); // undefined

  let s = "JavaScript";
  s[0] = "$"; // strings are immutable..
  console.log(s); // JavaScript

  // Converting values to string
  // Option 1
  let n = 333;
  let str0 = String(n);
  let str1 = "" + n;
  let str2 = n.toString();
  console.log(str0);
  console.log(typeof str0);
  console.log(str0);
  console.log(typeof str1);
  console.log(str0);
  console.log(typeof str2);

  // Iterate over characters of a string
  word = "hello";
  for (const c of word) {
    console.log(c);
  }

  // String methods:
  // toUpperCase() & upper()# The.lower method returns a copy of the string converted to lowercase.
  console.log("  MK  ".toUpperCase());

  // trim() trims whitespace from the beginning and end of the string.
  console.log("  MK  ".trim());

  // The split() method takes a pattern and divides a String into an ordered list of substrings
  // by searching for the pattern, puts these substrings into an array, and returns the array.
  const str = "The quick brown fox jumps over the lazy dog.";

  const words = str.split(" ");
  console.log(words[3]); // "fox"

  // SLICE
  // slice(indexStart, indexEnd) method extracts a section of a string and returns it as a new string, without modifying the original string.
  // Note that indexEnd (Optional) is index of the first character to "exclude" from the returned substring.
  // If indexEnd < 0, the index is counted from the end of the string.
  // If indexStart >= str.length, an empty string is returned.
  word = "0123456789";
  console.log(word.slice(1)); // 123456789
  console.log(word.slice(4, 7)); // 456
  console.log(word.slice(-1)); // 9
  console.log(word.slice(-2)); // 89

  // SEARCH a(sub) string in another string:
  // Option 1 - check if exists (like python IN)
  fname = "202206_rec.dat";
  if (fname.includes("rec")) {
    console.log("Yay! Substring found.");
  }

  // Option 2 - find the exact index
  // indexOf() returns the index within the calling String object of the "first occurrence" of searchValue, or - 1 if not found.
  const paragraph =
    "The quick brown fox jumps over the lazy dog. If the dog barked, was it really lazy?";
  const searchTerm = "quick";
  const indexOfFirst = paragraph.indexOf(searchTerm);

  console.log(`The index of the first "${searchTerm}" is ${indexOfFirst}`);

  // REPLACE
  // The replace() vs. replaceAll
  console.log(paragraph.replace("dog", "monkey"));
  console.log(paragraph.replaceAll("dog", "monkey"));

  word = "skateboard";
  console.log(word.slice(5).replace("o", "e")); // beard
}

function arrayBasics() {
  /*
    In JavaScript, arrays aren 't primitives but are instead Array objects with the following core characteristics:
      - JavaScript arrays are resizable and can contain a mix of different data types.
      - JavaScript arrays are zero-indexed.
      - A JavaScript array 's length property and numerical properties are connected.

    Unlike C arrays, JavaScript arrays can dynamically grow or shrink in size, and their elements can have different data types.
    */

  console.log("Array Basics");
  console.log("------------");

  // To declare an array, you use the following syntax:
  let myArray = [];

  // To declare an array with some initial elements:
  // Arrays consist of square brackets and items that are separated by commas.
  let items = [1, 2, 3];

  // Unlike C arrays, JavaScript arrays can dynamically grow or shrink in size, and their elements can have different data types.
  // push() method adds the specified elements to the end of an array and returns the new length of the array.
  const animals = ["pigs", "goats", "sheep"];

  const count = animals.push("cows");
  console.log(animals);
  console.log(`The new length after push: ${count}`); // 4

  // pop() method removes the last element from an array and returns that element.
  // This method changes the length of the array. If you call pop() on an empty array, it returns undefined.
  // Note that pop() method is a mutating method:
  const plants = ["broccoli", "cauliflower", "cabbage", "kale", "tomato"];
  console.log(plants);
  const removedPlant = plants.pop();
  console.log(`The removed element, returned by pop: ${removedPlant}`);
  console.log(plants);

  let planets = ["The Moon", "Venus", "Earth", "Mars", "Jupiter"];
  const moon = planets.shift(); // Remove the first element, "The Moon", from the planets array.
  planets.push("Saturn"); // Add in "Saturn" at the very end of the planets array
  planets.unshift("Mercury"); // Add "Mercury" as the first element in the planets array.
  const planets2 = ["Uranus", "Neptun"];

  // The concat() method is used to merge two or more arrays.
  // This method does not change the existing arrays, but instead returns a new array.
  planets = planets.concat(planets2);
  console.log(planets); // [ 'Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn','Uranus', 'Neptun']

  // can contain a mix of different data types.
  let mix_items = ["1", 2, "Three", false];

  // creates an array with nine elements and sets each of them to null.
  const arr2 = Array(9).fill(null);

  // We can access the number of elements in the items array through its length property:
  console.log(`number of elements in an array: ${mix_items.length}`); // 4

  // It's important to note that trying to access an index that is out of bounds for a string
  // (i.e., less than 0 or greater than or equal to the string's length) will return undefined.
  console.log(animals[999]); // undefined

  // Accessing every item
  // To iterate over the elements of the items array,
  // Option 1
  for (let i = 0; i < items.length; i++) {
    console.log(`items[${i}]: ${items[i]}`);
  }

  // Option 2 - for... of loop in ES6:
  for (let item of items) {
    console.log(item);
  }

  // Option 3 - keep the array unchanged, and return a new array iterating over the items
  nums = [1, 2, 3];
  const nums_double = items.map((item) => 2 * item);
  console.log("original_array: " + nums);
  console.log("original_array.map(): " + nums_double);

  // Converting between strings and arrays
  const data = "Manchester,London,Liverpool,Birmingham,Leeds,Carlisle";
  const cities = data.split(",");
  console.log(cities);

  // We can also go the opposite way using the join() method.
  const commaSeparated = cities.join(","); // Manchester,London,Liverpool,Birmingham,Leeds,Carlisle
  console.log(commaSeparated);

  // SORTING
  // The sort() method sorts the elements of an array IN PLACE and returns the reference to the same array
  // The default sort order is ascending, built upon converting the elements into STRINGS!
  animals.sort();
  console.log(animals);

  // In this example, people is an array containing four objects,
  // where each object represents a person and has three properties: name, age, and occupation.
  const people = [
    {
      name: "Alice",
      age: 25,
      occupation: "Engineer",
    },
    {
      name: "Bob",
      age: 30,
      occupation: "Teacher",
    },
    {
      name: "Charlie",
      age: 35,
      occupation: "Designer",
    },
    {
      name: "David",
      age: 40,
      occupation: "Doctor",
    },
  ];

  console.log(people);

  // Nested Arrays
  // Note that an array inside an array is called a multidimensional array.

  const gameBoard = [
    ["x", null, "x"],
    ["x", "o", null],
    ["o", null, null],
  ];

  let lastRow = gameBoard[2];
  let lastColofLastRow = gameBoard[2][2]; // lastRow[2], which is gameBoard[2][2]
  console.log(lastRow);
  console.log(lastColofLastRow);

  // Array destructuring
  // Basic variable assignment
  // on the left-hand side of the assignment to define what values to unpack from the sourced variable.
  const x = [1, 2, 3, 4, 5];
  const [y, z] = x;
  console.log(y); // 1
  console.log(z); // 2
}

function array_higherOrder() {
  // Array.prototype.find()
  // The find(callbackFn) method returns the first element in the provided array that satisfies testing function.
  // If no values satisfy the testing function, undefined is returned.
  // callbackFn is provided to execute for each element in the array.
  // It should return a truthy value to indicate a matching element has been found, and a falsy value otherwise.
  const grades = [50, 45, 74, 78, 66, 88];
  const firstPassed = grades.find((item) => item > 70);
  const firstA = grades.find((item) => item > 90); // undefined.
  console.log(firstPassed); // 74
  if (!firstA) {
    console.log("Unfortunately no one got an A.");
  }

  const students = [
    { id: 10, name: "Harry" },
    { id: 20, name: "Ron" },
    { id: 30, name: "Hermione" },
  ];

  const chessmaster = students.find((student) => student.id === 20);
  console.log("The chessmaster is: " + chessmaster.name);

  // Array.prototype.map(callbackFn)
  // It calls a provided callbackFn function once for each element in an array, and push the return value from callbackFn into a "new" array.
  // callbackFn is called with the following arguments: (element, index, array)
  // Note that map() method is a copying method. It does not alter this.
  // Note. Even if we omit in anonymous single line arrow functions, callbackFn actually returns a value for the input:

  // Example: Mapping an array of numbers to an array of square roots
  const numbers = [1, 4, 9];
  const roots = numbers.map((num) => Math.sqrt(num));
  console.log("original_array: " + numbers);
  console.log("original_array.map(): " + roots);

  // Example: Create an array of objects using an array of strings
  // Note. Even if we omit in anonymous single line arrow functions, callbackFn actually returns a value for the input:
  const names = ["John", "Jane", "Mike"];
  const participants = names.map((name, index) => {
    return { name, index }; // Notice object property shorthand {name: name}
  });

  console.log(participants); // [ { name: 'John' }, { name: 'Jane' }, { name: 'Mike' } ]

  // Example: return the squares only if the number is even.
  const numlist = [1, 2, 3, 4, 5, 6];
  const squares_of_evens = numlist.filter((n) => n % 2 == 0).map((n) => n * n);

  console.log("Numbers: ", numlist);
  console.log("Squares of evens: ", squares_of_evens);
}

function randomBasics() {
  // The random module actually produces pseudorandom(that is, deterministic) numbers
  // The Math.random() static method returns a floating-point, pseudo-random number that's greater than or equal to 0 and less than 1,
  // with approximately uniform distribution over that range — which you can then scale to your desired range.
  // The implementation selects the initial seed to the random number generation algorithm; it CANNOT be chosen or reset by the user.

  console.log("Random Basics");
  console.log("--------------");

  // simulate 1000 rolls of a 3 sided dice
  let max_excl = 3;
  const rolls = [0, 0, 0]; // each index representing freq of sides
  for (let i = 0; i < 1000; i++) {
    const roll = Math.floor(Math.random() * max_excl) + 1; // // Expected output: 1, 2 or 3
    switch (roll) {
      case 1:
        ++rolls[0];
        break;
      case 2:
        ++rolls[1];
        break;
      case 3:
        ++rolls[2];
        break;

      default:
        break;
    }
  }

  console.log(rolls); // something like [ 344, 319, 337 ]
}

function getMaxValue(a, b) {
  // Return the maximum value between a and b
  return a > b ? a : b;
}
