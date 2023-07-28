/*
One way to think of a function is as a black box that you can send input to (though input is not required).
The black box then performs a series of operations and returns output
(it implicitly returns None if the function ends without return being called).
Function is an abstraction, providing an interface hiding the implementation details.
An advantage of a function is that it enables CODE REUSE. Once a function is defined, you can call it multiple times.

Function Decleration:
---------------------

 - function keyword
 - the name of the function.
 - a list of parameters to the function, enclosed in parentheses and separated by commas.
 - statements that define the function, enclosed in curly brackets, { }.
 
 (Note that no types specified for parameters or return.)


Function expressions:
---------------------
While the function declaration above is syntactically a statement, functions can also be created by a function expression.

Such a function can be "anonymous" (just DROP the "name" in function decleration); it does not have to have a name. 
For example, the function square could have been defined as:

    const square = function (n) {
        return n * n;
    };

    const x = square(4); // x gets the value 16


 Arrow function expressions
 --------------------------
 A compact alternative to a traditional function expression.
 Drop "function" keyword, and add "=>" symbol:
 
 Syntax: 
 
    () => expression        - no parameters, no explicit "return" keyword

    param => expression     - single param, paranthesis are optional, no explicit "return" keyword

    (param) => expression    

    (param1, paramN) => expression

    () => {
        statements
    }

    param => {
        statements
    }

    (param1, paramN) => {
        statements
    }

Example 1:

    // Traditional anonymous function
    function (a) {
            return a + 100;
    }

    // arrow function expression
    a => a + 100;

Example 2:

    // Traditional anonymous function
    (function (a, b) {
        const chuck = 42;
        return a + b + chuck;
    });

    // Arrow function
    (a, b) => {
        const chuck = 42;
        return a + b + chuck;
    };

Example 3:

    const fixedUpperLimit = (a) => (a > 15) ? 15 : a;

Example 4:

    // Option 1 - Traditional anonymous function:
    const square_v0 = function (n) {
        return n * n;
    }
    // Option 2 - Arrow notation where function body has statement(s):
    const square_v1 = (x) => {
        return x * x;
    };

    // Option 3 - Arrow notation where function body has expression:
    // Note that there is no "return" keyword.
    const square_v2 = x => x * x;


     Calling a Function:
     ------------------
     Defining a function does not execute it.Defining it names the function and specifies what to do when the function is called.

     Calling the function actually performs the specified actions with the indicated parameters.
     For example, if you define the function square, you could call it as follows: square(5);
     JavaScript is extremely broad - minded about the number of arguments you pass to a function. 
       - If you pass too many, the extra ones are ignored. 
       - If you pass too few, the missing parameters get assigned the value undefined.

            function minus(a, b) {
                if (b === undefined) return -a;
                else return a - b;
            }

            console.log(minus(10)); // -10
            console.log(minus(10, 5)); // 5


 Function hoisting
 -----------------
 We can call a function before it 's declared. 
 This is because the JavaScript interpreter hoists the entire function declaration to the top of the current scope. (compare to c declerations at the top)


 Function Scope
 --------------
 Variables defined inside a function cannot be accessed from anywhere outside the function, because the variable is defined only in the scope of the function.
 However, a function can access all variables and functions defined inside the scope in which it is defined.
 In other words, a function defined in the global scope can access all variables defined in the global scope.

 First-class Function
 --------------------
 A programming language is said to have First-class functions when functions in that language are treated like any other variable.
 For example, in such a language, a function can be passed as an argument to other functions, can be returned by another function and can be assigned as a value to a variable.

    const foo = () => {
        console.log("foobar");
    };
    foo(); // Invoke it using the variable

Callback Functions:
-------------------
In JavaScript, functions are objects. So, we can pass functions as parameters to other functions and call them inside the outer functions. A callback is a function passed as an argument to another function.
Note: When you pass a function as an argument, do NOT to use parenthesis.

Higher-order functions
----------------------
Functions that operate on other functions, either by taking them as arguments or by returning them, are called higher-order functions.
Higher-order functions allow us to abstract over actions, not just values.

For example, to filter an array based on a condition, you can provide it as a function to filter function.




Functional Programming:
----------------------
In functional programming, computations are done by combining functions that take arguments and return a concrete value(or values) as a result.
These functions don't modify their input arguments and don't change the program 's state. 
They just provide the result of a given computation.
These kinds of functions are commonly known as "pure functions".

Functional programming typically uses lists, and other iterables to represent the data along with a set of functions that operate on that data and transform it.
When it comes to processing data with a functional style, there are at least three commonly used techniques:

    1. "Mapping" - Transforming with map()
    consists of applying a "transformation function" to an iterable to produce a "new iterable".
    Items in the new iterable are produced by "calling the transformation function on each item" in the original iterable.

    2. "Filtering"
    consists of applying a predicate or Boolean-valued function to an iterable to generate a new iterable.
    Items in the new iterable are produced by filtering out any items in the original iterable that make the predicate function return false.

    3. "Reducing" - Summarizing with reduce()
    consists of applying a reduction function to an iterable to produce a single cumulative value.


    Spread:
    -------
    The spread(...) syntax allows an iterable, such as an array or string, to be expanded in places 
    where zero or more arguments (for function calls) or elements(for array literals) are expected.


    Rest parameters:
    ----------------
    The rest parameter syntax allows a function to accept an indefinite number of arguments as an array:

        function sum_rest(...theArgs) {
            let total = 0;
            for (const arg of theArgs) {
                total += arg;
            }
            return total;
        }

*/

function mutator(car, arr) {
  // When you pass an object or array as a parameter, if the function changes the object's properties or array's values, that change is visible outside the function
  car.make = "Volkswagen";
  arr[0] = 0;
}

function sum_rest(...theArgs) {
  // The rest parameter syntax allows a function to accept an indefinite number of arguments as an array
  let total = 0;
  for (const arg of theArgs) {
    total += arg;
  }
  return total;
}

function restParametersBasics() {
  // The rest parameter syntax allows a function to accept an indefinite number of arguments as an array:
  console.log("sum_rest(1)            : " + sum_rest(1));
  console.log("sum_rest(1, 2, 3, 4, 5): " + sum_rest(1, 2, 3, 4, 5));

  // To send an array to a function accepting a rest parameter, we can use the spread operator
  const prices = [10, 20, 30];
  console.log("sum_rest(...prices)    :" + sum_rest(...prices));
}

function averageOfThreeNumbers(x, y, z) {
  return (x + y + z) / 3;
}

function spreadBasics() {
  const args = [70, 80, 87];

  // Spread in function call:
  const avg = averageOfThreeNumbers(...args);

  console.log("averageOfThreeNumbers(...args): " + avg);

  // Spread in array literals
  const parts = ["shoulders", "knees"];
  const lyrics = ["head", ...parts, "and", "toes"]; //  ["head", "shoulders", "knees", "and", "toes"]
  console.log(lyrics);

  let arr1 = [0, 1, 2];
  const arr2 = [3, 4, 5];

  arr1 = [...arr1, ...arr2]; // arr1 is now [0, 1, 2, 3, 4, 5]

  // Spread in object literals
  const course = {
    courseCode: "CSC101",
    courseName: "Introduction to CS",
    credits: 3,
  };
  const instructor = {
    instructorName: "John Doe",
    instructorEmail: "johndoe@example.com",
  };

  // 1. copy an object using spread !!
  const clonedObj = {
    ...course,
  };

  // 2. copy an object with some added properties !!
  const clonedAndExtendedObj = {
    ...course,
    prerequisites: ["MTH101", "ENG101"],
  };

  // 3. Merge objects
  // in case of a conflict in the key names, the order matters:
  // Notice foo:"baz"
  const mergedObj = {
    ...course,
    ...instructor,
  };

  console.log("The original   : " + JSON.stringify(course));
  console.log("The copy       : " + JSON.stringify(clonedObj));
  console.log("The extended   : " + JSON.stringify(clonedAndExtendedObj));
  console.log("The merged     : " + JSON.stringify(mergedObj));
}

function fpstyle() {
  // In functional programming, computations are done by combining functions that take arguments and return a concrete value (or values) as a result.
  // These functions don't modify their input arguments and don't change the program's state. They just provide the result of a given computation.
  // These kinds of functions are commonly known as pure functions.

  console.log("FP Basics");
  console.log("------------");

  const nums = [1, 2, 3, 4, 5];
  console.log("Initial array: " + nums);

  // 1. forEach(callbackFn) method performs the specified action (calls the callbackfn function one time) for each element in an array.
  // Note that unlike map(), forEach() always returns undefined and is not chainable.

  nums.forEach(function (n) {
    console.log(2 * n);
  });
  console.log(nums);

  // 2. map() method creates a new array populated with the results of calling a provided function on every element in the calling array.

  const doubles = nums.map((x) => x * 2);
  console.log("nums: " + nums); // 1,2,3,4,5
  console.log("doubles: " + doubles); // 2,4,6,8,10

  // 3. filter() method returns the elements of an array that meet the condition specified in a callback function.
  // The filter method calls the predicate function one time for each element in the array, which should return a truthy value to keep the element in the resulting array, and a falsy value otherwise.
  const words = [
    "spray",
    "limit",
    "elite",
    "exuberant",
    "destruction",
    "present",
  ];
  console.log("array: " + words);

  const result = words.filter((word) => word.length > 6);
  console.log("filtered array: " + result);

  const imdbTop10 = [
    {
      title: "The Shawshank Redemption",
      year: 1994,
      director: "Frank Darabont",
      cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
      rating: 9.3,
      genre: ["Drama"],
    },
    {
      title: "The Godfather",
      year: 1972,
      director: "Francis Ford Coppola",
      cast: ["Marlon Brando", "Al Pacino", "James Caan"],
      rating: 9.2,
      genre: ["Crime", "Drama"],
    },
    {
      title: "The Godfather: Part II",
      year: 1974,
      director: "Francis Ford Coppola",
      cast: ["Al Pacino", "Robert De Niro", "Robert Duvall"],
      rating: 9.0,
      genre: ["Crime", "Drama"],
    },
    {
      title: "The Dark Knight",
      year: 2008,
      director: "Christopher Nolan",
      cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
      rating: 9.0,
      genre: ["Action", "Crime", "Drama"],
    },
    {
      title: "12 Angry Men",
      year: 1957,
      director: "Sidney Lumet",
      cast: ["Henry Fonda", "Lee J. Cobb", "Martin Balsam"],
      rating: 8.9,
      genre: ["Drama"],
    },
    {
      title: "Schindler's List",
      year: 1993,
      director: "Steven Spielberg",
      cast: ["Liam Neeson", "Ben Kingsley", "Ralph Fiennes"],
      rating: 8.9,
      genre: ["Biography", "Drama", "History"],
    },
    {
      title: "The Lord of the Rings: The Return of the King",
      year: 2003,
      director: "Peter Jackson",
      cast: ["Elijah Wood", "Viggo Mortensen", "Ian McKellen"],
      rating: 8.9,
      genre: ["Action", "Adventure", "Drama"],
    },
    {
      title: "Pulp Fiction",
      year: 1994,
      director: "Quentin Tarantino",
      cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
      rating: 8.9,
      genre: ["Crime", "Drama"],
    },
    {
      title: "The Lord of the Rings: The Fellowship of the Ring",
      year: 2001,
      director: "Peter Jackson",
      cast: ["Elijah Wood", "Ian McKellen", "Orlando Bloom"],
      rating: 8.8,
      genre: ["Action", "Adventure", "Drama"],
    },
    {
      title: "Fight Club",
      year: 1999,
      director: "David Fincher",
      cast: ["Brad Pitt", "Edward Norton", "Helena Bonham Carter"],
      rating: 8.8,
      genre: ["Drama"],
    },
  ];

  // chaining filter and map
  ninePlus = imdbTop10.filter((mov) => mov.rating >= 9).map((mov) => mov.title);
  console.log("9+ rating titles: " + ninePlus); // The Shawshank Redemption, The Godfather, The Godfather: Part II, The Dark Knight

  // 4. reduce(callbackFn, initialValue)
  // Calls the specified callback function for all the elements in an array.
  // The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.

  // Example 1 - calculate the sum of all elements in the array:
  const array1 = [1, 2, 3, 4];

  const sum = array1.reduce(
    (accumulator, currentValue) => accumulator + currentValue
  );
  console.log("Sum as a result of reduce(): " + sum);

  // Example 2 - calculate total cost of groceries list:
  const groceries = [
    {
      name: "bread",
      price: 2,
      quantity: 2,
    },
    {
      name: "milk",
      price: 4,
      quantity: 1,
    },
    {
      name: "yogurt",
      price: 3,
      quantity: 2,
    },
  ];
  initialValue = 0;
  const totalCost = groceries.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.price * currentValue.quantity,
    initialValue
  );
  console.log(totalCost); // 14
  console.log("Groceries Total: " + totalCost);

  // Example 3 - Find the min price in the list:
  // Note that initialValue is Infinity!
  const cheapest = groceries.reduce(
    (min, currentValue) =>
      currentValue.price < min ? currentValue.price : min,
    Infinity
  );
  console.log("Min price: " + cheapest);

  // 5. every
  // every() method tests whether ALL elements in the array pass the test implemented by the provided function. It returns a Boolean value.
  allPass = imdbTop10.every((mov) => mov.rating >= 9); // false
  console.log("all 9+ movies?: " + allPass);

  // 6. some
  // some() method tests whether AT LEAST ONE element in the array passes the test implemented by the provided function.
  // It returns true if, in the array, it finds an element for which the provided function returns true; otherwise it returns false.
  // It doesn't modify the array.
  allPass = imdbTop10.some((mov) => mov.rating >= 9); // true
  console.log("at least one 9+ movie?: " + allPass);
}

function scopeBasics() {
  let deadlyAnimal = "Blue-Ringed Octopus";
  handleAnimal(); // local wins: Scorpionfish
  console.log(deadlyAnimal); // Blue-Ringed Octopus
}

function handleAnimal() {
  let deadlyAnimal = "Scorpionfish"; // there is a global version as well
  console.log(deadlyAnimal);
}

function minus(a, b) {
  // passing a missing number of parameters
  return b === undefined ? -a : a - b;
}

// Default Parameters
// Default function parameters allow named parameters to be initialized with default values if no value or undefined is passed.
function power(base, exponent = 2) {
  let result = 1;
  for (let count = 0; count < exponent; count++) {
    result *= base;
  }
  return result;
}

function parameterBasics() {
  // passing a missing number of parameters
  console.log("minus(10): " + minus(10)); // -10
  console.log("minus(10, 2): " + minus(10, 2)); // 8

  // default arguments
  console.log(power(5)); //25
  console.log(power(2, 8)); // 256
}

function functionExpressions() {
  console.log("Function Expressions");
  console.log("--------------------");

  // functions can also be created by a function expression.
  // Option 1 - Traditional anonymous function:
  const square_v0 = function (n) {
    return n * n;
  };
  // Option 2 - Arrow notation where function body has statement(s):
  const square_v1 = (x) => {
    return x * x;
  };

  // Option 2 - Arrow notation where function body has expression:
  // Note that there is no "return" keyword.
  const square_v2 = (x) => x * x;

  const x = square_v0(4); // x gets the value 16
  console.log("square_v0(4): " + square_v0(4));
  console.log("square_v1(4): " + square_v1(4));
  console.log("square_v2(4): " + square_v2(4));

  const fixedUpperLimit = (a) => (a > 15 ? 15 : a);
  console.log("fixedUpperLimit(100): " + fixedUpperLimit(100));
}

function add(x, y) {
  return x + y;
}

function multiply(x, y) {
  return x * y;
}

// accept a function object
function higherOrderExecutor(f, param1, param2) {
  return f(param1, param2); // call function argument
}

// return a function
function sayHello() {
  return () => {
    console.log("Hello!");
  };
}

// A function that returns a function
function greaterThan(n) {
  return (m) => m > n;
}

function firstClassFunctions() {
  // A function that returns a function or takes other functions as arguments is called a higher-order function.

  // Pass a function as argument
  const x = higherOrderExecutor(add, 10, 20);
  const y = higherOrderExecutor(multiply, 10, 20);

  console.log(x);
  console.log(y);

  // A function that returns a function
  let greaterThan10 = greaterThan(10);
  let greaterThan1000 = greaterThan(1000);
  console.log("greaterThan10(11): " + greaterThan10(11)); // → true
  console.log("greaterThan1000(11): " + greaterThan1000(11)); // → false
}

// CALLBACK

// Example 1a - Execute provided callback with no parameters

// implementation of a function, which performs some operations of uncertion duration,
// and then execute provided callback when ready.
function completeSomeTasks_thenFollowProvidedCommands(callback) {
  console.log("Started working on some operations of uncertion duration");
  // process
  console.log("Done. Now I get back to you, through the provided callback.");

  // and then execute callback when ready
  // do not know implementation details of callback
  // here, the function who is accepting the callback (this function)
  // declares that it will execute the provided callback WITHOUT an argument!
  callback();

  console.log("All done. Bye.");
}

// Callback implementation, no parameters
function executeMeWhenReady() {
  console.log("I see that you are done. Thanks for your hard work.");
}

// Example 1.b
// callback where the actual api accepts no paramters, but out implementation of callback has a parameter.
// so, we wrap our function with an anonymous function

// Callback implementation, WITH parameters
function doubleTheValue(number) {
  const value = number * 2;
  console.log("Did somebody call me? Here are the results: ", value);
}

// Example 2 - callback with arguments

// Perform an operation and invoke the callback with the result
function performOperation(param1, param2, callback) {
  console.log(
    "performOperation(): Working.. Caller will be notified of results."
  );
  // Perform the operation
  const result = param1 + param2;
  // Invoke the callback with the result
  callback(result);

  // why not return directly?
  // for this simple demo case we could.
  // for cases where callback provides logic (higher-order array func),
  // event-processing: handler assignments where you do not know when
  // you will have results (if ever),
  // async events where we do not know when computation will finish
  // return result;
}

// Define the callback function to be passed
function processResult(result) {
  console.log("The result is handled to me:", result);
}

// Higher-order functions allow us to abstract over actions, not just values.
// We can even write functions that provide new types of control flow
function unless(test, then) {
  if (!test) then();
}

const check = (n) => {
  unless(n % 2 == 0, () => console.log(n + " is odd."));
};

function createMultiplier(factor) {
  return (number) => number * factor;
}

function returningAFunction() {
  const twoTimes = createMultiplier(2);
  console.log(twoTimes(5));

  const tenTimes = createMultiplier(10);
  console.log(tenTimes(5));
}

function passByRef() {
  const mycar = {
    make: "Kia",
    model: "Sorento",
    year: 2007,
  };
  const scores = [70, 80, 90];

  mutator(mycar, scores);

  console.log(mycar);
  console.log(scores);
}

function callbackBasics() {
  // this is the actual function call
  // caller provides callback implementation - flexibility and customization
  completeSomeTasks_thenFollowProvidedCommands(executeMeWhenReady);

  // Call the function and provide the callback
  performOperation(10, 20, processResult);

  // this is the actual function call
  completeSomeTasks_thenFollowProvidedCommands(() => doubleTheValue(11)); // 22
}

// scopeBasics();
// parameterBasics();

// functionExpressions();
// firstClassFunctions();

// callbackBasics();

// fpstyle();

// spreadBasics();
restParametersBasics();
// check(11);
// passByRef();

// returningAFunction();
