// we will export this simple function
function sayHi() {
    console.log("Hello, there!");
}

// examining the global module object in each file. 
// The module object has an "exports" property which is an empty object.
console.log(module);
/*
Module {
    id: '.',
    path: '/Users/mk/dev/webdev/src/js',
    exports: {},
    filename: '/Users/mk/dev/webdev/src/js/modules.js',
    loaded: false,
    children: [],
    paths: [
        '/Users/mk/dev/webdev/src/js/node_modules',
        '/Users/mk/dev/webdev/src/node_modules',
        '/Users/mk/dev/webdev/node_modules',
        '/Users/mk/dev/node_modules',
        '/Users/mk/node_modules',
        '/Users/node_modules',
        '/node_modules'
    ]
}
*/


/*
We can export functions and values from a module by either using module.exports:

1. Since module.exports is an object, so we can set it to an object, 
   where we create the object using object property shorthand syntax in ES6 (the key will have the same name)
    
    module.exports = {
        value1,
        function1
    }

2. or by creating a new key-value pair for the object: exports.property:

    exports.value1 = value1
    exports.function1 = function1


*/


module.exports = {
    sayHi
};
// or create a key explicitly
// exports.sayHi = sayHi

console.log(module.exports); // { sayHi: [Function: sayHi] }

// Now, sayHi is available for use in other parts of the application. 
// To use it, you import it like this
// const util = require("./util");
// util.sayHi();