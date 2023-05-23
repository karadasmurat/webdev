// Type alias
type Employee = {
  id: number;
  name: string;
  retire: (date: Date) => void;
};

function greet_primitives(person: string, age: number) {
  console.log(`Hello ${person}, you are ${age} years old!`);
}

function greet_object(person: { name: string; age: number }) {
  console.log(`Hello ${person.name}, you are ${person.age} years old!`);
}

function greet_ts(person: string, date: Date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}

// The parameter's type annotation is an object type
function printCoord(pt: { x: number; y: number }) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

function printName(obj: { first: string; last?: string }) {
  if (obj.last !== undefined) {
    console.log(obj.last.toUpperCase());
  }

  // A safe alternative using modern JavaScript syntax:
  console.log(obj.last?.toUpperCase());
}

interface Point {
  x: number;
  y: number;
}

// Exactly the same as the earlier example
function printCoordinates(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

function displayParameterInfo(param: any): void {
  console.log(`Parameter type: ${typeof param}, value: ${param}`);
}

// Union Types (this or that)
// A function that can operate on strings or numbers:
function printId_union(id: number | string) {
  if (typeof id === "string") {
    // In this branch, id is of type 'string'
    console.log(id.toUpperCase());
  } else {
    // Here, id is of type 'number'
    console.log(id);
  }
}
// Union Types - narrowing with Array.isArray()
function welcomePeople(x: string[] | string) {
  if (Array.isArray(x)) {
    // Here: 'x' is 'string[]'
    console.log("Hello, " + x.join(" and "));
  } else {
    // Here: 'x' is 'string'
    console.log("Welcome, lone traveler " + x);
  }
}

//Instersection Types - (this and that)
type Draggable = {
  drag: () => void;
};

type Resizable = {
  resize: () => void;
};

type MyWidget = Draggable & Resizable;

// Create a variable called foo that will only allow the literal value 'Hello' to be assigned to it:
let foo: "Hello";

// Combine type literals to create other types
type PackSize = 50 | 100;
type CardinalDirection = "North" | "East" | "South" | "West";

// accept a parameter named direction, which is of type CardinalDirection, which is one of 4 string literals only.
function navigate(direction: CardinalDirection): void {
  console.log("Navigating:", direction);
}

function cannotCallWithNull(x: string) {
  console.log("Hello, " + x.toUpperCase());
}

function callWithStringOrNull(x: string | null) {
  if (x === null) {
    console.log("Is there anybody out there?");
  } else {
    console.log("Hello, " + x.toUpperCase());
  }
}

// The unknown type is the type-safe version of any.
// we have to do some form of checking before performing most operations on values of type unknown
// we don't have to do any checks before performing operations on values of type any.
function stringifyForLogging(value: unknown): string {
  if (typeof value === "function") {
    // Within this branch, `value` has type `Function`,
    // so we can access the function's `name` property
    const functionName = value.name || "(anonymous)";
    return `[function ${functionName}]`;
  }

  if (value instanceof Date) {
    // Within this branch, `value` has type `Date`,
    // so we can call the `toISOString` method
    return value.toISOString();
  }

  return String(value);
}

function main() {
  // add a type annotation to explicitly specify the type of the variable
  let firstName: string = "Harry";

  // Type Inference - the type of a variable is inferred based on the type of its initializer
  let lastName = "Potter";

  // declare an object type explicitly, and initialize:
  const course1: {
    code: number;
    title: string;
  } = {
    code: 1,
    title: "Math 100",
  };

  // Type Inference - the type of a variable is inferred based on the type of its initializer
  // Inferred type is : { code: number, title: string }
  const course2 = {
    code: 1,
    title: "Math 100",
  };

  // Inferred type is : string[]
  const names = ["Harry", "Ron", "Hermione", "Draco"];
  const names_cap = names.map((name) => name.toUpperCase());

  // The any type is essentially an escape hatch from the type system.
  let value: any;

  value = true; // OK
  value = 42; // OK
  value = "Hello World"; // OK
  value = []; // OK
  value = {}; // OK
  value = Math.random; // OK
  value = null; // OK
  value = undefined; // OK
  value = new TypeError(); // OK
  value = Symbol("type"); // OK

  value.foo.bar; // OK
  value.trim(); // OK
  value(); // OK
  new value(); // OK
  value[0][1]; // OK

  // END any

  // Nullable types:
  let comment: string | null = null;

  greet_primitives("Potter", 10);
  greet_object({ name: "Potter", age: 10 });

  displayParameterInfo(10);
  displayParameterInfo("Hello");
  displayParameterInfo(true);

  printCoord({ x: 3, y: 7 });

  // Both OK
  printName({ first: "Bob" });
  printName({ first: "Alice", last: "Alisson" });

  let msg = "hello there!";
  console.log(msg);

  // printCoordinates({ x: 100, y: 100 });

  // Union Types - Both OK
  printId_union(101);
  printId_union("202");

  // Union Types - Both OK
  welcomePeople("Dumbledore");
  welcomePeople(["Harry", "Ron", "Hermione", "Draco"]);

  // Literal Types
  navigate("North"); // Valid
  navigate("East"); // Valid
  // navigate("Up"); // Error: Argument of type '"Up"' is not assignable to parameter of type 'CardinalDirection'.

  // strictNullChecks - true by default.
  // when false, we can assign null to a variable of any type (like Java and C#)
  // The lack of checking for these values tends to be a major source of bugs!
  let productID: number;
  // productID = null; // ERR !

  cannotCallWithNull("Potter");
  // cannotCallWithNull(null); // ERR !

  callWithStringOrNull("Potter");
  callWithStringOrNull(null);
}

main();

const product1: {
  name: string;
  unitPrice?: number;
} = {
  name: "T10",
};

const product2: {
  name: string;
  unitPrice?: number;
} = {
  name: "T20",
  unitPrice: 20_000,
};
