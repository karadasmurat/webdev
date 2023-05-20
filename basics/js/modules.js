// Option 1 - importing with an alias:
const util = require("./util");

// Option 2 - importing directly using object destructuring
const {
    cars
} = require("./data");

// 1: call with the alias
util.sayHi();

// 2: use directly, without an alias
console.log(cars);