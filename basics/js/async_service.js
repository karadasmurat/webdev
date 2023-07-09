rollDice(); // does NOT block the next line after its invocation!
console.log("DONE rollDice()");

rollDice_async(); // does NOT block the next line after its invocation!
console.log("DONE rollDice_async()");

// a function that calls another function, which returns a Promise
// v1 - then / catch
// Note that rollDice doesn't need to be declared as async, as it's using the traditional promise chain
// with .then and .catch to handle the promise returned by rollDiceService.
function rollDice() {
  console.log("BEGIN rollDice()");
  rollDiceService()
    .then((val) => console.log("then():", val))
    .catch((err) => console.log("catch()", err));

  console.log("END rollDice()");
}

// v2 - async / await
// Note that rollDice_async should be declared as async if you want to use the await keyword inside it
// to handle the Promise returned by rollDiceService.
async function rollDice_async() {
  console.log("BEGIN rollDice_async()");
  try {
    // val is NOT ready immediately.
    // But overall, a Promise will be returned immediately!
    // And this async rollDice_async overall does NOT block the next line after its invocation!
    // But internally, it blocks the rest, to be executed after Promise is resolved.
    const val = await rollDiceService();
    console.log("async:", val);
  } catch (error) {
    console.log("async err:", error);
  }

  console.log("IS PAUSED locally untill await is resolved.");
  console.log("END rollDice_async()");
}

/** BEGIN SERVICE DEFINITION */
function roll() {
  return Math.floor(Math.random() * 6) + 1; // a dice roll
}

// Note that declaring a function that returns a Promise as async is not required.
// The async keyword is used to define an asynchronous function that implicitly returns a Promise.
// to simulate an error, use face value 1. Else, return face value.
function rollDiceService() {
  return new Promise((resolve, reject) => {
    let n = roll();
    // Simulate the producing code which takes time
    setTimeout(() => {
      if (n != 1) {
        // resolve with the result - to be handled by then()
        resolve(n);
      } else {
        const reason = "Rejected due to lack of Luck!";
        reject(reason);
      }
    }, n * 500);
  });
}
/** END SERVICE DEFINITION */
