/*

what happens when you have function calls in the Call Stack that take a huge amount of time to be processed?

Imagine, for example, a complex image transformation algorithm that’s running in the browser.
While the Call Stack has functions to execute, the browser can’t do anything else — it’s being blocked. 
This means that the browser can’t render, it can’t run any other code, it’s just stuck. 
And here comes the problem — your app UI is no longer efficient and pleasing. Your app is stuck.


Synchronous operations block other operations from executing until it completes. 
But, what if the synchronous function takes a long time ? Our program may be completely unresponsive!

Asynchronous programming is a technique that enables your program to start a potentially long-running task and still be able to be responsive to other events
while that task runs, rather than having to wait until that task has finished. Once that task has finished, your program is presented with the result.

The asynchronous methods do not block, they IMMEDIATELY return a "promise" to supply the value "at some point in the future".

Here are some common asynchronous operations:
    - Fetching data over a network.
    - Writing to a database.

1. Event handlers are a form of asynchronous programming: Callbacks
    An event handler is a particular type of callback.
    A callback is just a function that 's passed into another function, with the expectation that the callback will be called at the appropriate time.


    setTimeout
    ----------
    look at "async_node.js" for description and examples
    setTimeout(callback, delay)

    API takes as arguments a callback function and a delay, given in milliseconds.
    When setTimeout() is called, it starts a timer set to the given delay, and when the time expires, it calls the given function.


2. PROMISES
    The foundation of asynchronous programming in modern JavaScript.
    A promise is an object returned by an asynchronous function, which represents the current state of the operation. 
    At the time the promise is returned to the caller, the operation often isn 't finished, but the promise object provides methods (.then, .catch) to handle the eventual success or failure of the operation.

A Promise represents a computation that doesn’ t complete immediately. 
In simple words, a Promise object in JavaScript is a container that represents a value that might not be available yet, but will be at some point in the future.

When a Promise is created, it starts out in the pending state.
Once the operation completes, the Promise is either resolved (fullfilled) with a value or rejected with a reason.
Once the Promise object is returned, it can be used with the then() and catch () methods to handle the result or any errors that occur during the operation.

Promise Syntax: 

    how to construct: new Promise(executor)

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
        // Note that The then() method of a Promise object takes up to two arguments: then(onFulfilled, onRejected) callback functions
        // for the fulfilled and rejected cases of the Promise: Promise.then(f, f)
        myPromise.then(
            function (value) {// code if successful },
            function (error) {// code if some error, option 1 }
        );

        // code if some error, option 2
        // .catch () method of a Promise object schedules a function to be called when the promise is rejected.
    
        myPromise
            .then((val) => {})
            .catch((err) => {})


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



CHAINING ASYNC FUNCTIONS
------------------------
(there is a sample implementation tied to a button: .then chain)

    getUser()
        .then(getPosts)
        .then(processPosts)
        .then((cnt) => displayLog("Post count: " + cnt))
        .catch(error => {
            console.error(error);
        });

In this example, we call getUser() first, which returns a promise. (ASYNC FUNCTION - using fetch api)
We then call getPosts() and pass it the user object returned by getUser()
processPosts() returns a promise that resolves to number of posts. 
Finally, we log the result of processing as the number of posts.( Note that we could use it as: .then(displayLog), but we wanted to log a full message )

Note that in the then() method, the result of the previous function is automatically passed as the first argument to the next function in the chain.
This means that the getPosts() function will receive the user object returned by getUser() as its first argument, 
and the processPosts() function will receive the object returned by getPosts() as its first argument.

This is one of the key features of chaining async functions with then(): 
each function in the chain can depend on the result of the previous function WITHOUT NEEDING TO PASS EXPLICIT PARAMETERS. 
This makes the code simpler and easier to read and write.

fetch API
---------
There are multiple ways to send a network request and get information from the server

    let promise = fetch(url, [options])

Without options, this is a simple GET request, downloading the contents of the url.
Getting a response is usually a two - stage process:
 - First, the promise, returned by fetch, resolves with an object of the built - in Response class as soon as the server responds with headers.
 At this stage we can check HTTP status, to see whether it is successful or not, check headers, but don’ t have the body yet.
 -Second, to get the response body, we need to use an additional method call. Response provides multiple promise - based methods to access the body in various formats:
 
    response.text()         – read the response and return as text,
    response.json()         – parse the response as JSON,
    response.formData()     – return the response as FormData object,
    response.blob()         – return the response as Blob(binary data with type),
    response.arrayBuffer()  – return the response as ArrayBuffer(low - level representation of binary data),

 In summary, a typical fetch request consists of two await calls:
 
    let response = await fetch(url, options);   // resolves with response headers
    let result = await response.json();         // read body as json

 Or, without await :

 fetch(url, options)
     .then(response => response.json())     // Note that response.json() returns a Promise, so we can chain another .then() 
     .then(result => // process result )    




What is Axios ?
Axios is a promise - based HTTP Client for node.js and the browser.
It is isomorphic( = it can run in the browser and nodejs with the same codebase).
On the server - side it uses the native node.js http module, while on the client(browser) it uses XMLHttpRequests.

    < script src = "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js" > < /script>

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
    displayLog("Delayed for 1 second.");
  }, 1000);

  // setTimeout() is an asynchronous function, meaning that the timer function will not pause execution of other functions in the functions stack.
  // In other words, you CANNOT use setTimeout() to create a "pause" before the next function in the function stack fires.
  setTimeout(() => {
    // console.log("Delayed for 2 seconds.");
    displayLog("Delayed for 4 seconds.");
  }, 4000);

  //since the previous does not block, this will finish before the previous one!
  setTimeout(() => {
    // console.log("Delayed for 4 seconds.");
    displayLog(
      "Delayed for 2 seconds. Should I wait everyone else before me? No, I am done :)"
    );
  }, 2000);

  // for the same reason, the overall delay is not 1 + 2 + 4 = 7 sec, but only 4secs.
}

document.getElementById("set-timeout").addEventListener("click", timeoutBasics);

function roll() {
  return Math.floor(Math.random() * 6) + 1; // a dice roll
}

// Scenario 1 - create a simple Promise, global variable
// say hello (call resolve with hello) after 4 seconds. (using setTimeout)
// in a normal scenario, Promise would be returned from a service, like an API
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("hello, there!");
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
        const reason = "Rejected due to lack of Luck!";
        reject(reason);
      }
    }, 1000);
  });
}

document.getElementById("roll-die").addEventListener("click", () => {
  document.getElementById("promiseLog").innerText = "please wait...";
  rollDiceService()
    .then((val) => {
      // document.getElementById("promiseLog").innerHTML = `<img style='width:50px' src='https://cdn.emojidex.com/emoji/seal/die_face_${val}.png'>`;
      document.getElementById(
        "promiseLog"
      ).innerHTML = `<img style='width:50px' src='images/die_face_${val}.png'>`;
    })
    .catch((err) => {
      const errImg = document.createElement("img");
      errImg.src = "images/err.png";
      errImg.setAttribute("width", "50px");
      const logDiv = document.getElementById("promiseLog");
      logDiv.innerHTML = ""; // remove all the content
      logDiv.appendChild(errImg); // append new content
    });
});

const output = document.getElementById("output");
const button = document.getElementById("set-alarm");
const sec = document.getElementById("duration");

function alarmP(delay, person = "mk") {
  return new Promise((resolve, reject) => {
    if (delay < 0) {
      throw new Error("Alarm delay must not be negative");
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
    output.textContent = "Time is up!";
  }, duration);
}

// button.addEventListener('click', alarm);
button.addEventListener("click", () => {
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
  const groceryList = [
    {
      name: "apples",
      price: 2.5,
      quantity: 3,
    },
    {
      name: "bread",
      price: 2,
      quantity: 2,
    },
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
    sum += item.price * item.quantity;
  }
  displayLog("Total: " + sum);
  return sum;
}

document
  .getElementById("btn_async01")
  .addEventListener("click", callAnotherAsync);

// FETCH API Example 1
// A typical fetch request consists of two await calls
async function fetch_SWAPI() {
  // The simplest use of fetch() takes one argument — the path to the resource you want to fetch, and
  // returns a promise that resolves with a Response object.
  // The Response object, in turn, does not directly contain the actual JSON response body but is instead a representation of the entire HTTP response:
  const response = await fetch("https://swapi.dev/api/people/1");

  // So, to extract the JSON body content from the Response object, we use the json() method,
  // which returns a second promise that resolves with the result of parsing the response body text as JSON:
  const jsonData = await response.json();

  console.log(jsonData);
  displayLog(jsonData["name"]);

  // In a linear fashion, use the previous response for the next fetch:
  const resp = await fetch(jsonData["homeworld"]); // https://swapi.dev/api/planets/1/
  const data_hw = await resp.json();
  console.log(data_hw);
  displayLog(data_hw["name"]);
}

document.getElementById("btn_fetch01").addEventListener("click", fetch_SWAPI);

// FETCH API - Example 2
// the same without await, using pure promises syntax, older style of asynchronous programming using Promises
// Note that response.json() returns a Promise, so we can chain another .then()
// Note that the function is NOT async
function fetchPokemons() {
  //fetch("https://pokeapi.co/api/v2/pokemon?limit=100")
  fetch("https://pokeapi.co/api/v2/pokemon/25")
    .then((response) => response.json()) // Note that response.json() returns a Promise, so we can chain another .then()
    .then((pika) => displayLog(pika["name"]));
}

document
  .getElementById("btn_fetchPoke")
  .addEventListener("click", fetchPokemons);

// FETCH API - Example 3
// catch
function fetchErr() {
  fetch("https://err.co/noapi/")
    .then((response) => {
      // At this stage we can check HTTP status, to see whether it is successful or not, check headers, but don’t have the body yet.
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // do something with data
    })
    .catch((error) => displayLog("Error fetching data: " + error.message));
}

document.getElementById("btn_fetchErr").addEventListener("click", fetchErr);

// Axios - Promise based HTTP client for the browser and node.js
async function axios_getGithubName() {
  try {
    const response = await axios.get(
      "https://api.github.com/users/karadasmurat"
    );
    console.log("Axios response:", response);
    displayLog(response.data["name"]);
  } catch (error) {
    // handle error
    displayLog(error);
  }
}

document
  .getElementById("btn_axios01")
  .addEventListener("click", axios_getGithubName);

async function getUser() {
  displayLog("Getting details of user 1 ...");
  const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
  const user = await response.json();
  displayLog("Email is: " + user.email + " Getting posts...");
  return user;
}

async function getPosts(user) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${user.id}`
  );
  const posts = await response.json();
  return posts;
}

// to simulate waiting, we return a promise which resolves after a timeout.
async function processPosts(posts) {
  displayLog("Processing posts...");

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(posts.length);
      resolve(posts.length);
    }, 1000);
  });
}

/*
In the then() method, the result of the previous function is automatically passed as the first argument to the next function in the chain.
This means that the getPosts() function will receive the user object returned by getUser() as its first argument, 
and the processPosts() function will receive the object returned by getPosts() as its first argument.

This is one of the key features of chaining async functions with then(): each function in the chain can depend on the result of the previous
function WITHOUT NEEDING TO PASS EXPLICIT PARAMETERS. 
This makes the code simpler and easier to read and write.

*/
document.getElementById("getDataButton").addEventListener("click", function () {
  getUser()
    .then(getPosts)
    .then(processPosts)
    .then(displayLog)
    .catch((error) => {
      console.error(error);
    });
});
