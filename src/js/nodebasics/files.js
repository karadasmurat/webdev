/*

$ node files.js mkdir|touch name
The node:fs module enables interacting with the file system
All file system operations have synchronous, callback, and promise - based forms, and are accessible using both CommonJS syntax and ES6 Modules(ESM).
*/

const fs = require('fs');
var http = require('http');

const op = process.argv[2];
const fname = process.argv[3];

// sync
if (op == 'mkdir') {
    fs.mkdirSync(fname);
} else if (op == 'touch') {
    console.log("saving file.");
    fs.writeFileSync(fname, '');
} else {
    console.log("Unsupported operation.")
}

console.log("Done.");

// async
// fs.mkdir('fstest/01', {
//     recursive: true
// }, (err) => {
//     if (err) throw err;
// });