function regExpBasics() {
  console.log("Regular Expression Basics");

  // v1. Using a regular expression literal
  // The forward slashes / / indicate that we are creating a regular expression pattern,
  // like we use quotes “ ” to create a string.
  const regexPattern1 = /Harry/;

  // v2. calling the constructor function of the RegExp object
  const re = new RegExp("ab+c");

  console.log(regexPattern1.test("Potter, Harry"));
  console.log(regexPattern1.test("potter, harry")); // false, case sensitive.

  const regexPattern2 = /harry/i;
  console.log(regexPattern2.test("potter, harry")); // true: "i"

  // boundary - ^start
  const regexPattern3 = /^cat/i;
  console.log(regexPattern3.test("The cat and mouse")); // false

  // boundary - end$
  const regexPattern4 = /cat$/;
  console.log(regexPattern4.test("The mouse and the cat")); // true

  const regexPattern5 = /c[au]t/;
  console.log(regexPattern5.test("The mouse and the cat")); // true
  console.log(regexPattern5.test("The bread cutter.")); // true
  console.log(regexPattern5.test("caut")); // false
}

regExpBasics();
