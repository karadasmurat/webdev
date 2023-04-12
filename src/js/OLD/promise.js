// A promise is commonly defined as a proxy for a value that will eventually become available.

// Instead of immediately returning the final value, the asynchronous method returns a promise to supply the value at some point in the future.

// Once a promise has been called, it will start in a pending state. 
// This means that the calling function continues executing, while the promise is pending until it resolves, giving the calling function whatever data was being requested.

// The created promise will eventually end in a resolved state, or in a rejected state, calling the respective callback functions (passed to then and catch) upon finishing.

let done = true;

// The promise constructor takes one argument: 
// a callback with two parameters, resolve and reject.
let myPromise = new Promise( (resolve, reject) => {

    console.log("New Promise...")

    if (done) {

        // simulate that resolution takes 5 seconds:
        setTimeout( () => {
            console.log("Done.");
            resolve("RESOLVED")
        }, 5000);

    } else {
        const reason = "Rejected."
        reject(reason);
    }

});

// At the time the promise is returned to the caller, the operation often isn't finished, 
// but the promise object provides methods to handle the eventual success or failure of the operation.
console.log("Promise object returned.");
console.log(myPromise); // >Promise{<pending>}

const check = () => {

    console.log("Checking...")

    myPromise
        .then(ok => console.log("THEN: " + ok))
        .catch(err => console.log(err));

}

check();

// code flow does not wait for the completion of .then()
console.log("Life goes on without waiting for .then()");

let myJSONArray = [];
let myJSON = {};
const fetchPromise = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');
console.log(fetchPromise);

fetchPromise
    .then(resp => {
        console.log(`Received response. Status: ${resp.status}`);
        // we want to get the response data as JSON, 
        // so we would call the json() method of the Response object. 

        return resp.json();
    })
    // It turns out that json() is also asynchronous. 
    // a new then() handler into the promise returned by response.json()
    .then(jsn => {
        console.log(jsn); // an array of objects.

        myJSON = jsn[0];
        console.log(myJSON); // prints object.
    })

    .catch(err => console.log(err));

// variable may not be ready here, 
// code flow does not wait for the completion of then() !!
console.log(myJSON); // prints empty object {}