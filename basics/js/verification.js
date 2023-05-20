try {
    getTheFirstArrayItem("Potter"); // Error: Use a non-empty array argument
    getTheFirstArrayItem([]); // Error: Use a non-empty array argument
} catch (error) {
    console.error(error.name + ": " + error.message);
}



// a function that should never be called on empty arrays:
function getTheFirstArrayItem(array) {
    if (!Array.isArray(array) || array.length == 0) {
        throw new Error("Use a non-empty array argument");
    }
    return array[0];
}