/* 
get arguments from command line:
$ node args.js hello there
/usr/local/bin/node
/Users/mk/dev/webdev/src/js/nodebasics/args.js
hello
there
*/
const args = process.argv;
for (let arg of args) {
    console.log(arg);
}