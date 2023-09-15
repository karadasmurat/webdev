console.log("hello, node!");

var age = 10;
if (age > 65) {
  console.log("You get your income from your pension");
} else if (age > 18) {
  console.log("Each month you get a salary");
} else if (age > 0) {
  console.log("You get an allowance");
} else {
  console.log("The value of the age variable is not numerical");
}

var day = "Sunday";
switch (day) {
  case "Monday":
    console.log("Monday stuff");
    break;
  case "Tuesday":
    console.log("Tuesday stuff");
    break;
  case "Wednesday":
    console.log("Wednesday stuff");
    break;
  case "Thursday":
    console.log("Thursday stuff");
    break;
  case "Friday":
    console.log("Friday stuff");
    break;
  case "Saturday":
    console.log("Saturday stuff");
    break;
  case "Sunday":
    console.log("Sunday stuff");
    break;

  default:
    console.log("There is no such day");
    break;
}

for (let i = 1; i < 11; i++) {
  if (i == 1) {
    console.log("Gold medal");
  } else if (i == 2) {
    console.log("Silver medal");
  } else if (i == 3) {
    console.log("Bronze medal");
  } else {
    console.log(i);
  }
}

const letterFinder = (word, match) => {
  for (let i = 0; i < word.length; i++) {
    if (word[i] == match) {
      console.log("Found the", match, "at", i);
    } else {
      console.log("---No match found at", i);
    }
  }
};

letterFinder("test", "t");

let obj = {
  //JavaScript object named obj with some define properties inside it
  key: 1,
  title: "xyzkt01",
};

obj.new_property = 100;

console.log(obj);

const cars = new Array("Kia", "Volkswagen");
console.log("type:", typeof cars, "isArray:", Array.isArray(cars));

const house = "Gryffindor"; // String literal
console.log(house[0]); // G - Treat the string as an array-like object
console.log(house.charAt(0)); // G

//split
const str = "The quick brown fox jumps over the lazy dog.";

const words = str.split(" ");
console.log(words[1]); //quick

const clothes = [];
clothes.push("cloth1");
clothes.push("cloth2");
clothes.push("cloth3");
clothes.push("cloth4");
clothes.push("cloth5");

const lastItem = clothes.pop();
clothes.push("cloth6");
console.log(clothes[2]);

const favCar = {};
favCar.color = "color1";
favCar.convertible = false;
console.log(favCar);

const car = { make: "Kia", speed: 0 };
car.speedUp = function (s) {
  this.speed += s;
};

// In modern JavaScript, it's more common to define methods using arrow functions
// to ensure that the value of this is bound correctly.
car.break = (s) => {
  car.speed -= s;
};

console.log(car.speed);
car.speedUp(10);
car.break(2);
console.log(car.speed); // 8

function Car(make, speed) {
  this.make = make;
  this.speed = speed;
}

// Add a method to the Car prototype
Car.prototype.speedUp = function (s) {
  this.speed += s;
};

// Create instances of Car
const car1 = new Car("Kia", 0);
const car2 = new Car("Toyota", 0);

// Both instances share the same speedUp method
car1.speedUp(10);
car2.speedUp(20);

console.log(car1.speed); // Outputs 10
console.log(car2.speed); // Outputs 20

class Bus {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  speedUp(s) {
    this.speed += s;
  }
}

// Create instances of Car
const bus1 = new Bus("Metrobus", 0);
const bus2 = new Bus("Koruklu", 0);

// Both instances share the same speedUp method
bus1.speedUp(10);
bus2.speedUp(20);

console.log(bus1.speed); // Outputs 10
console.log(bus2.speed); // Outputs 20

// throw "Error2"; // String type
// throw 42; // Number type
// throw true; // Boolean type
// throw new Error("The message");

function addTwoNums(a, b) {
  if (typeof a != "number" || typeof b != "number") {
    throw new ReferenceError("arguments must be numbers");
  }

  console.log(a + b);
}

try {
  addTwoNums(1, "23");
} catch (err) {
  // console.log("Error! ", err);
}

console.log("It still works");

function getFirstChar(arg) {
  console.log("working on strings");
  return arg.charAt(0);
}

// getFirstChar(333); // TypeError: arg.charAt is not a function

function noDefaultParams(number) {
  console.log("Squared:", number * number);
}

noDefaultParams(); // Squared: NaN
noDefaultParams("Potter"); // Squared: NaN
noDefaultParams(5, 10, 15); // Squared: 25

// Object destructuring in JavaScript allows you to extract values from objects and
// assign them to variables "with the same name as the object's properties".
// "Create a new variable called PI", and its value is set to the value of the PI property from the Math object.
let { PI } = Math;
console.log(PI); // 3.141592653589793
console.log(Math.PI); // 3.141592653589793

// Note that this reassignment changes the value of the PI variable but
// has no effect on the original Math.PI property.
PI = 3;
console.log(PI); // 3
console.log(Math.PI); // 3.141592653589793

const { pi } = Math; // IMPORTANT - undefined! (property names are indeed case-sensitive)
console.log(pi); // undefined

let arr = [1, "potter", false];
for (let val of arr) {
  console.log(val); // 1, "potter", false
}

for (let index in arr) {
  console.log(index); // 0, 1, 2
}

const myCar = { make: "Kia", year: 2007, convertible: false };
for (let index in myCar) {
  console.log(index); // make, year, convertible;
}

// TypeError: Objects are not iterable
// for (let val of myCar) {
//   console.log(val); // make, year, convertible;
// }

for (let key of Object.keys(myCar)) {
  console.log(key, ": ", myCar[key]);
}

// Assume we have an object that is not an array,
// a range object that represents an interval of numbers, look suitable to iterate
let range = {
  from: 10,
  to: 15,

  // implement Symbol.iterator method, which returns an Iterator.
  // Iterator is an object with next() method.
  [Symbol.iterator]() {
    return new RangeIterator(this);
  },
};

// An implementation for Iterator object, which has a next() method
class RangeIterator {
  // wrap a range object.
  constructor(range) {
    this.range = range;
    this.current = range.from;

    console.log("init RangeIterator, current:", this.current);
  }

  // next returns the value wrapped in an object: {value, done}
  next() {
    if (this.current < this.range.to) {
      return {
        value: this.current++,
        done: false,
      };
    } else {
      return {
        value: undefined,
        done: true,
      };
    }
  }
}
// Provide implementation for the Symbol.iterator property.
// Which is a method that returns an Iterator, which is an object with next method.
// range[Symbol.iterator] = () => ({
//   current: range.from,
//   end: range.to,
//   next() {
//     if (this.current < this.end) {
//       return {
//         value: this.current++,
//         done: false,
//       };
//     } else {
//       return {
//         value: "test",
//         done: true,
//       };
//     }
//   },
// });

for (let item of range) {
  console.log(item);
}
