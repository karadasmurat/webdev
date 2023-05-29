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


setTimeout
----------
syntax:
setTimeout(callback, milliseconds)

API takes as arguments a callback function and a delay, given in milliseconds.

When setTimeout() is called, it starts a timer set to the given delay, and when the time expires, it calls the provided callback.

1. Actually, the browser creates a timer as part of the Web APIs. It is going to handle the countdown for you. 
And what are these Web APIs? In essence, they are threads that you can’t access, you can just make calls to them. 
They are the pieces of the browser in which concurrency kicks in. 
If you’re a Node.js developer, these are the C++ APIs.

2. The setTimeout(cb, ms) itself is complete and is removed from the "Call Stack".
3. After at time expires, Web API pushes the callback to the "Callback Queue".
4. The "Event Loop" takes the callback from the Callback Queue and pushes it to the "Call Stack".
That doesn’t mean that myCallback will be executed in exactly milliseconds later, but rather that, the callback will be added to the event loop queue. 
The queue, however, might have other events that have been added earlier — your callback will have to wait.



  // version 1: use callback name only:
  setTimeout(info, 1000);

  // version 2: use callback, with a parameter
  // wrap with an arrow function:
  // ( ) => { cb(arg) }
  setTimeout(() => info("cb with a message"), 2000);

  // version 3: anonymous function
  // ( ) => { // any code }
  setTimeout(() => {console.log("anonymouse fn body");}, 3000);

*/

function delay(time) {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, time);
  });
}

function info(msg) {
  console.log("INFO:", msg || "default message");
}
function first() {
  console.log("first done.");
}
function second() {
  console.log("second done.");
}
function third() {
  console.log("third done.");
}

function timeoutSyntax() {
  // syntax:
  // setTimeout(callback, milliseconds)

  // version 1: use callback name only:
  setTimeout(info, 1000);

  // version 2: use callback, with a parameter
  // wrap with an arrow function:
  setTimeout(() => info("cb with a message"), 2000);

  // version 3: anonymous function
  // ( ) => { }
  setTimeout(() => {
    console.log("anonymouse fn body");
  }, 3000);
}

function timeoutOrder() {
  first();
  setTimeout(second, 1000); // Invoke `second` after 1000ms
  third();

  // Expected output:
  // first done.
  // third done.
  // second done.
}

// ##############
// ##############

// timeoutSyntax();
timeoutOrder();
