// we provide default values for all, arguments and the object as well, in case called with no params
function argPrinter({ first = 1, second = 2 } = {}) {
  console.log("first:", first, "second:", second);
}

argPrinter(); // first: 1 second: 2
argPrinter({ first: 11 }); // first: 11 second: 2
argPrinter({ second: 22 }); // first: 1 second: 22
argPrinter({ third: 33 }); // first: 1 second: 2
