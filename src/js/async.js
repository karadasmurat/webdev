/*

Synchronous operations block other operations from executing until it completes. 
But, what if the synchronous function takes a long time ? Our program may be completely unresponsive!

Asynchronous programming is a technique that enables your program to start a potentially long-running task and still be able to be responsive to other events
while that task runs, rather than having to wait until that task has finished. Once that task has finished, your program is presented with the result.

The asynchronous methods do not block, they immediately return a "promise" to supply the value at some point in the future.

Here are some common asynchronous operations:
    - Fetching data over a network.
    - Writing to a database.

1. Event handlers are a form of asynchronous programming: Callbacks
    An event handler is a particular type of callback.
    A callback is just a function that 's passed into another function, with the expectation that the callback will be called at the appropriate time.

2. Promises are the foundation of asynchronous programming in modern JavaScript.
    A promise is an object returned by an asynchronous function, which represents the current state of the operation. 
    At the time the promise is returned to the caller, the operation often isn 't finished, but the promise object provides methods to handle the eventual success or failure of the operation.

In simple words, a Promise object in JavaScript is a container that represents a value that might not be available yet, but will be at some point in the future.
A Promise represents a computation that doesn’ t complete immediately.
When you call a function that returns a future, the function queues up work to be done and immediately returns an uncompleted future.

When a Promise is created, it starts out in the pending state.
Once the operation completes, the Promise is either fulfilled with a value or rejected with a reason.
Once the Promise object is returned, it can be used with the then() and catch () methods to handle the result or any errors that occur during the operation.


Wrapping setTimeout()
We 'll use the setTimeout() API to implement our alarm() function. 
The setTimeout() API takes as arguments a callback function and a delay, given in milliseconds. 
When setTimeout() is called, it starts a timer set to the given delay, and when the time expires, it calls the given function.


async and await
---------------
The async keyword gives you a simpler way to work with asynchronous promise-based code.
The async and await keywords enable asynchronous, promise - based behavior to be written in a cleaner style, avoiding the need to explicitly configure promise chains.

Adding async at the start of a function makes it an async function:

    async function myFunction() {
        // This is an async function
        // Inside an async function, you can use the "await" keyword before a call to a function that returns a promise. 
        // Here, we are calling await fetch(), and instead of getting a Promise, our caller gets back a fully complete Response object, just as if fetch() were a synchronous function!
        const response = await fetch('https://web/products.json');
    }

In summary, the await keyword allows you to write asynchronous code that looks and behaves like synchronous code, 
without blocking the program while waiting for long - running operations to complete.

Keep in mind that just like a promise chain, await forces asynchronous operations to be completed in series.
This is necessary if the result of the next operation depends on the result of the last one, but if that 's not the case then something like Promise.all() will be more performant.

*/


// Once a promise has been called, it will start in a pending state. 
// This means that the calling function continues executing, while the promise is pending until it resolves, giving the calling function whatever data was being requested.

// The created promise will eventually end in a resolved state, or in a rejected state, calling the respective callback functions (passed to then and catch) upon finishing.


const output = document.getElementById('output');
const button = document.getElementById('set-alarm');
const sec = document.getElementById("duration");

function alarmP(delay, person = "mk") {
    return new Promise((resolve, reject) => {
        if (delay < 0) {
            throw new Error('Alarm delay must not be negative');
        }
        // wrap resolve with timeout
        setTimeout(() => {
            // If the work is successful, call the resolve function with the result
            resolve(`Alarm, ${person}!`);
        }, delay);
    });
}

function alarm() {
    const duration = parseInt(sec.value) * 1000;
    setTimeout(() => {
        output.textContent = 'Time is up!';
    }, duration);
}

// button.addEventListener('click', alarm);
button.addEventListener('click', () => {
    const delay = parseInt(sec.value) * 1000;
    alarmP(delay).then((msg) => output.textContent = msg);
});