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

When a Promise is created, it starts out in the pending state.
Once the operation completes, the Promise is either fulfilled with a value or rejected with a reason.
Once the Promise object is returned, it can be used with the then() and catch () methods to handle the result or any errors that occur during the operation.

Promise Syntax: 
    constructor: new Promise(executor)

    function executor(resolveFunc, rejectFunc) { ... }

    Note that the constructor takes an executor parameter, which is a function to be executed by the constructor.
    executor receives two functions as parameters: resolveFunc and rejectFunc.
    resolveFunc and rejectFunc are also functions, and you can give them whatever actual names you want.
    Their signatures are simple: they accept a single parameter of any type.
    * Simply, we call resolve with the return value as the argument when we want to return in the executor.


    let myPromise = new Promise( (resolveFunc, rejectFunc) => {

        // "Producing Code" (May take some time)
        ...

        // When the producing code obtains the result, it should call one of the two callbacks:
        resolveFunc(return_value); // when successful - call resolve with the return value as the argument.
        rejectFunc(error_object); // when error - call resolve with the error value as the argument.
    });

    // "Consuming Code" (Must wait for a fulfilled Promise)
    myPromise.then(
        function (value) {// code if successful },
        function (error) {// code if some error }
    );

Option 2 - chain catch() 
catch () method of a Promise object schedules a function to be called when the promise is rejected.
    
    myPromise.then((val) => {}).catch((err) => {})


Note that The then() method of a Promise object takes up to two arguments: then(onFulfilled, onRejected)
callback functions for the fulfilled and rejected cases of the Promise: Promise.then(f, f)

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


function displayLog(msg, mode = "a") {
    if (mode === "a") {
        document.getElementById("console").innerHTML += "<br>" + msg;
    } else if (mode === "w") {
        document.getElementById("console").innerText = msg;
    }

}

function timeoutBasics() {

    displayLog("timeoutBasics() activated.");

    // The global setTimeout() method sets a timer which executes a function or specified piece of code once the timer expires.
    // It takes as arguments a callback function and a delay, given in milliseconds: setTimeout(code, delay)
    // When setTimeout() is called, it starts a timer set to the given delay, and when the time expires, it calls the given function.

    setTimeout(() => {
        //console.log("Delayed for 1 second.");
        displayLog("Delayed for 1 second.")
    }, 1000);

    // setTimeout() is an asynchronous function, meaning that the timer function will not pause execution of other functions in the functions stack. 
    // In other words, you CANNOT use setTimeout() to create a "pause" before the next function in the function stack fires.
    setTimeout(() => {
        // console.log("Delayed for 2 seconds.");
        displayLog(("Delayed for 4 seconds."))
    }, 4000);

    //since the previous does not block, this will finish before the previous one!
    setTimeout(() => {
        // console.log("Delayed for 4 seconds.");
        displayLog("Delayed for 2 seconds. Should I wait everyone else before me? No, I am done :)")
    }, 2000);

    // for the same reason, the overall delay is not 1 + 2 + 4 = 7 sec, but only 4secs.

}


document.getElementById("set-timeout").addEventListener('click', timeoutBasics);



function roll() {
    return Math.floor(Math.random() * 6) + 1; // a dice roll
}

// Scenario 1 - create a simple Promise, global variable
// say hello (call resolve with hello) after 4 seconds. (using setTimeout)
// in a normal scenario, Promise would be returned from a service, like an API
const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('hello, there!');
    }, 4000);
});

promise1.then((value) => {
    document.getElementById("hello").innerText = value;
});



// Scenario 2 - a function returning a Promise
// roll a dice. If not 1, return face value.
function rollDiceService() {
    return new Promise((resolve, reject) => {

        // Simulate the producing code which takes time
        setTimeout(() => {
            n = roll();
            if (n != 1) {
                // finally, callback resolve with the result - to give the caller.
                resolve(n);
            } else {
                const reason = "Rejected due to lack of Luck!"
                reject(reason);
            }
        }, 1000);

    });
}

document.getElementById('roll-die').addEventListener('click', () => {
    document.getElementById("promiseLog").innerText = "please wait...";
    rollDiceService().then((val) => {
        // document.getElementById("promiseLog").innerHTML = `<img style='width:50px' src='https://cdn.emojidex.com/emoji/seal/die_face_${val}.png'>`;
        document.getElementById("promiseLog").innerHTML = `<img style='width:50px' src='images/die_face_${val}.png'>`;
    }).catch((err) => {
        const errImg = document.createElement("img");
        errImg.src = "images/err.png";
        errImg.setAttribute("width", "50px")
        const logDiv = document.getElementById("promiseLog");
        logDiv.innerHTML = ""; // remove all the content
        logDiv.appendChild(errImg); // append new content
    });
});





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
    // display a message immediately
    displayLog("Info: Alarm set.");

    // wait for async function, using then, and work with the results (just display in this case)
    const delay = parseInt(sec.value) * 1000;
    alarmP(delay).then((msg) => displayLog(msg)); //output.textContent = msg);
});


// ASYNC example 1 - an empty function, marked async
// Note that you can call this function on chrome Developer Tools> Console: doNothing_async();
// it is marked async, therefore it will return Promise.
async function doNothing_async() {
    // note that this function does not explicityly return anything.
    // however, it is marked async, therefore it will return Promise.
}

// ASYNC example 2
// fake api to return a list of grocery items:
async function getData_async() {
    const groceryList = [{
            'name': 'apples',
            'price': 2.5,
            'quantity': 3
        },
        {
            'name': 'bread',
            'price': 2,
            'quantity': 2
        }
    ];

    // return a Promise, which will resolve after a timeout:
    // buna alternatif olarak Promise'i kaldırıp, setTimout içinde retun diyemeyiz, neden?: 
    // since setTimeout() is an asynchronous function, it does not wait for the delay to complete before moving on to the next line of code, 
    // which in this case is the implicit return statement at the end of the function!
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(groceryList);
        }, 1000);
    });
}


// async example 2: async functions can contain zero or more await expressions. 
async function callAnotherAsync() {

    // async functions can contain zero or more await expressions. 
    // Await expressions make promise-returning functions behave as though they're synchronous 
    // by suspending execution until the returned promise is fulfilled or rejected.
    let glist = await getData_async();

    // wait for getting the data from an async function (await)
    // process the data to calculate and return total cost:
    let sum = 0;
    for (let item of glist) {
        sum += (item.price * item.quantity);

    }
    displayLog("Total: " + sum);
    return sum;
}


document.getElementById("btn_async01").addEventListener('click', callAnotherAsync);


// FETCH API Example 1
// async/await
async function fetch_SWAPI() {
    // The Response object, is a representation of the entire HTTP response:
    const response = await fetch("https://swapi.dev/api/people/1");
    // to extract the JSON body content from the Response object, we use the json() method:
    const jsonData = await response.json();
    console.log(jsonData);
    displayLog(jsonData['name']);

    const resp = await fetch(jsonData['homeworld']); // https://swapi.dev/api/planets/1/
    const data_hw = await resp.json();
    console.log(data_hw);
    displayLog(data_hw['name']);
}

document.getElementById("btn_fetch01").addEventListener('click', fetch_SWAPI);

// FETCH API - Example 2
// no need to put the "async" keyword before the function in this case, older style of asynchronous programming using Promises 
function fetchPokemons() {
    //fetch("https://pokeapi.co/api/v2/pokemon?limit=100")
    fetch("https://pokeapi.co/api/v2/pokemon/25")
        .then(response => response.json())
        .then(pika => displayLog(pika['name']))
}
document.getElementById("btn_fetchPoke").addEventListener('click', fetchPokemons);