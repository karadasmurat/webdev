/*
An important part of programming is finding, diagnosing, and fixing errors.

Sometimes, when the problem can be handled locally, special return values are a good way to track them.
Otherwise, exceptions may be preferable.

Exceptions
When a function cannot proceed normally, what we would like to do is just stop what we are doing and immediately jump to a place that knows how to handle the problem.
This is what exception handling does.

Exceptions are a mechanism that makes it possible for code that runs into a problem to raise (or throw) an exception.
An exception can be any value. 

Raising one somewhat resembles a super - charged return from a function: it jumps out of not just the current
function but also its callers, all the way down to the first call that started the current execution.This is called unwinding the stack.


https: //developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error

Strict mode
JavaScript can be made a little stricter by enabling strict mode. This is done by putting the string 
    "use strict"
at the top of a file or a function body.

Error objects are thrown when runtime errors occur.
The Error object can also be used as a base object for user - defined exceptions.

properties are defined on Error.prototype:

    -Error.prototype.name: Represents the name for the type of error. (default is "Error")
    - Error.prototype.stack: A non-standard property for a stack trace.

These properties are own properties of each Error instance:

    - message: Error message.
    - cause: Error cause indicating the reason why the current error is thrown— usually another caught error.


Throwing a generic error
The "throw" keyword is used to raise an exception.

Catching one is done by wrapping a piece of code in a try block, followed by the keyword catch. 
When the code in the try block causes an exception to be raised, the catch block is evaluated, with the name in parentheses bound to the exception value.
After the catch block finishes— or if the try block finishes without problems— the program proceeds beneath the entire try/catch statement.

    try {
        console.log("You see", look());
    } catch (error) {
        console.log("Something went wrong: " + error);
    }


Cleaning up after exceptions
A "finally" block says “no matter what happens, run this code after trying to run the code in the try block.”

In summary, The exception value will be given to the catch block that catches it, which should verify that it is actually the expected kind of exception and then do something with it.To help address the unpredictable control flow caused by exceptions,
    finally blocks can be used to ensure that a piece of code always runs when a block finishes.
*/


//ES6 Custom Error
class MKError extends Error {

    constructor(message) {
        super(message);
        // this.name = 'MK Error';
    }

}

getTheFirstArrayItem([]); // Error: Use a non-empty array argument
// canYouSpotTheProblem();
handle_error();
finally_with_no_errors();




function canYouSpotTheProblem() {

    // Strict mode
    "use strict";

    // Normally, when you forget to put let in front of your binding, as with counter in the example, JavaScript quietly creates a global binding and uses that. 
    // In strict mode, an error is reported instead. 

    for (counter = 0; counter < 10; counter++) { // ReferenceError: counter is not defined
        console.log("Happy happy");
    }
}


function handle_error() {
    try {
        // doWork_throwGenericError();
        doWork_throwCustomError()
    } catch (error) {

        console.log("Caught an error!");

        // Handling a specific error type
        if (error instanceof MKError) {
            console.log("We have a custom error!");
        }

        console.error("name:" + error.name);
        console.error(error.message);
        console.error(error.cause);
        // console.error(error.stack);
    }
}



function doWork_throwGenericError() {

    // Throwing a generic error
    throw new Error("We have a generic problem.");
}

function doWork_throwCustomError() {
    throw new MKError("We have a custom problem.");
}


function finally_with_no_errors() {
    try {
        console.log("everything is OK");
    } catch (error) {
        console.log("we have a problem" + error);
    } finally {
        console.log("no matter what happens, run finally!");
    }
}

// a function that expects a non-empty arrays argument:
function getTheFirstArrayItem(array) {
    if (!Array.isArray(array) || array.length == 0) {
        throw new Error("Use a non-empty array argument");
    }
    return array[0];
}