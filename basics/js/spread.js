const { hp_students } = require("./data");
const { car_kia, car_troc } = require("./data");

function copy_spread() {
  // v1 Copy an Array With the Spread Operator
  std_copy_1 = [...hp_students];

  // v2 iterate using .map() and return each item in the callbackFn
  std_copy_2 = hp_students.map((student) => student);

  // v3 conventional copy
  // allocate a new array, loop the original, and insert into new array.
  const std_copy_3 = [];
  for (std of hp_students) {
    std_copy_3.push(std);
  }

  console.log("students:", hp_students);
  console.log("std_copy_1:", std_copy_1);
  console.log("std_copy_2:", std_copy_2);
  console.log("std_copy_3:", std_copy_3);

  console.log(hp_students == std_copy_1); // false
  console.log(hp_students == std_copy_2); // false

  // v1 Copy an Object With the Spread Operator
  car_copy_1 = { ...car_kia };

  // v2. Object.assign(target, source)
  car_copy_2 = Object.assign({}, car_kia);

  console.log("car:", car_kia);
  console.log("car_copy_1:", car_copy_1);
  console.log("car_copy_2:", car_copy_2);

  console.log(car_kia == car_copy_1); // false
  console.log(car_kia == car_copy_2); // false
}

function merge_spread() {
  // Merge arrays with spread operator:
  const fruitNames = ["apple", "banana", "orange", "grape", "strawberry"];
  const vegetableNames = ["carrot", "broccoli", "tomato"];

  const fv = [...fruitNames, ...vegetableNames];

  console.log("fruitNames", fruitNames);
  console.log("vegetableNames", vegetableNames);
  console.log("fv", fv);

  // Merge objects with spread operator:
  const person = { name: "John", birth_year: 1990 };
  const contact = {
    email: "john@example.com",
    address: { city: "London", country: "United Kingdom" },
  };
  const account = { ...person, ...contact };

  console.log("account", account);
  // {
  //   name: 'John',
  //   birth_year: 1990,
  //   email: 'john@example.com',
  //   address: { city: 'London', country: 'United Kingdom' }
  // }
}

function shallow_copy_spread() {
  // an array of strings (value type)
  names = ["Alice", "Bob"];
  // an array of objects (reference type)
  students = [
    { name: "Alice", age: 20 },
    { name: "Bob", age: 21 },
  ];

  // shallow copy an array of primitives
  names_copy = [...names];
  names_copy[0] = "MODIFIED";
  console.log(names, names_copy); // [ 'Alice', 'Bob' ] [ 'MODIFIED', 'Bob' ]

  // shallow copy an array of references (like an array of pointers)
  students_copy = [...students];
  students_copy[0] = { name: "MODIFIED", age: 20 }; // assign a new object: ORIGINAL object is NOT modified
  students_copy[1].age = 99; // modify object property through the reference: ORIGINAL object is modified!
  console.log(students); // [ { name: 'Alice', age: 20 }, { name: 'MODIFIED', age: 21 } ]
  console.log(students_copy); // [ { name: 'MODIFIED', age: 20 }, { name: 'MODIFIED', age: 21 } ]
}

// ###############################################

shallow_copy_spread();
// copy_spread();
// merge_spread();


