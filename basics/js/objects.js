/* 
JavaScript objects
------------------
Numbers, booleans, and strings are the atoms (primitives) that data structures are built from. 
Many types of information require more than one atom, though. 
Objects allow us to group values—including other objects—to build more complex structures.

The following example defines an empty object using the object literal syntax:

    let emptyObject = {};

This means that braces have two meanings in JavaScript:
  * At the start of a statement, they start a block of statements. 
  * In any other position, they describe an object.

In JavaScript, an object is a collection of properties, where each property is defined as a key - value pair.
Inside the braces, there is a list of properties separated by commas. 
Each property has a "name" followed by a "colon" and a "value".

    const person = {
        firstName: "John",
        lastName: "Doe",
        age: 50,
        eyeColor: "blue"
    };

To find out what properties an object has, you can use the Object.keys function.

The two main ways to access properties in JavaScript are with a dot and with square brackets. 
Both value.x and value[x] access a property on value—but not necessarily the same property. 
The difference is in how x is interpreted. When using a dot, the word after the dot is the literal name of the property. 
When using square brackets, the expression between the brackets is evaluated to get the property name. 
Whereas value.x fetches the property of value named “x”, value[x] tries to evaluate the expression x and uses the result, converted to a string, as the property name.

  for (let k of Object.keys(product)) {
    console.log(k, product[k], product.k); // IMPORTANT! - .k prints undefined
  }


Mutability
----------
Object values can be modified. 
You can change their properties, causing a single object value to have different content at different times.

  const product = {
    name: "Gummy Bears",
    price: 1.99,
  };
  
  // Set the value of an existing property:
  product.name = "New Gummy Bears";

  // Add a new property
  product.img = "product.png";

  // Remove an existing property
  delete product.price;


Identity:
---------

There is a difference between having two references to the same object, and 
having two different objects that contain the same properties. 

    // reference type - referencing a mutable object, through a variable name.
    let person = {
        name: "john",
        age: 22,
    };

    // copy the reference - a new reference to an existing memory
    let person2 = person;

    // mutate through the second reference:
    person2.name = "Johnny";

    // access modified property through the first reference
    console.log(person.name); // "Johnny"





*/

function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}

function iterateOverProperties(obj) {
  console.log("Iterate over Properties of", obj);

  // v1 - for...in
  console.log("**** Using for...in loop");
  for (const k in obj) {
    console.log(k, ":", obj[k]);
  }

  // list of keys: Object.keys()
  // returns an array of property names (keys)
  console.log("**** Using Object.keys()");
  for (let key of Object.keys(obj)) {
    console.log(key, ":", obj[key], obj.key); // IMPORTANT - .k results in undefined - use [k] first evaluates to string, then access
  }
}

function checkIfPropertyExists() {
  const product = {
    name: "Gummy Bears",
    inStock: true,
    price: 1.99,
    flavors: ["grape", "apple", "cherry"],
    special: undefined, // note that this could be problematic
  };

  // Property existance test
  // let key = "name";
  let key = "special"; // consider this

  // v1: cmost of the time the comparison with undefined works fine.
  // But there’s a special case when it fails, but "in" works correctly:
  // It’s when an object property exists, but stores undefined!
  //   Situations like this happen very rarely, because undefined should not be explicitly assigned - We mostly use null for “unknown” or “empty” values.
  // Note that in JavaScript, compared to many other languages, is that it’s possible to access any property:
  // There will be no error if the property doesn’t exist!
  if (product[key] !== undefined) {
    console.log("v1 - property found!", key);
  } else {
    console.log("v1 - property not found!", key);
  }

  // v2: "in" operator:
  if (key in product) {
    console.log("v2 - property found!", key);
  } else {
    console.log("v2 - property not found!", key);
  }

  // v3: hasOwnProperty() checks if the object has the specified property as its direct property.
  // The method returns false if the property is inherited, or has not been declared at all.
  if (product.hasOwnProperty(key)) {
    console.log("v3 - property found!", key);
  } else {
    console.log("v3 - property not found!", key);
  }
}

function objectIdentity() {
  //primitive types - immutable

  let var1 = 10;
  let var2 = 10;
  let var_copy = var1;

  console.log("testing  === on primitives: ");
  console.log(var1 === var2); // Output: true
  console.log(var1 === var_copy); // Output: true

  // mutate through the copied variable:
  var_copy = 30;

  // check initial variable
  console.log(var1, var_copy); //10 30

  // reference types
  // reference type - referencing a mutable object, through a variable name.
  const obj1 = { name: "John" };
  const obj2 = { name: "John" };

  // copy the reference - a new reference to an existing memory
  const obj_copy = obj1;

  console.log("comparison: ");
  console.log("==", obj1 == obj2); // IMPORTANT! false
  console.log("===", obj1 === obj2); // false

  console.log(obj1 == obj_copy); // true
  console.log(obj1 === obj_copy); // true

  // mutate through the copied reference:
  obj_copy.name = "Johnny";

  // access modified property through the first reference
  console.log(obj1.name, obj_copy.name); // Johnny Johnny
}

function objectBasics() {
  /*
    The syntax always follows this pattern:

        const objectName = {
            member1Name: member1Value,
            member2Name: member2Value,
            member3Name: member3Value,
        };

     */

  console.log("Object Basics");
  console.log("--------------");

  // An empty object (“empty cabinet”) can be created using one of two syntaxes:
  let book1 = new Object(); // "object constructor" syntax
  let book2 = {}; // "object literal" syntax

  let obj1 = {
    0: "test", // same as "0": "test"
  };
  console.log(obj1[0]);

  const product = {
    name: "Gummy Bears",
    inStock: true,
    price: 1.99,
    flavors: ["grape", "apple", "cherry"],
    describe: function () {
      console.log(this.name + ", " + this.price);
    },
  };

  // access the object's properties:
  // Option 1 - Bracket notation
  console.log(product["name"]);

  // Option 2 - Dot notation
  console.log(product.price);

  // Note that square bracket notation [ ] provide a way
  // to obtain the property name as the "result of any expression"
  console.log(
    "[] allows expressions",
    product[Math.random() >= 0.5 ? "name" : "price"]
  );

  // The undefined value is produced if an attempt is made to retrieve a nonexistent member:
  console.log("attempt to retrieve a nonexistent member", product.noObject); // undefined

  // Attempting to retrieve values from undefined will throw a TypeError exception:
  // const val_0 = product.noObject.noProperty; // ERR
  const val_1 = product.noObject && product.noObject.noProperty; // undefined
  const val_2 = product.noObject ?? "default_value"; // default_value

  console.log("Check if undefined &&", val_1); // undefined
  console.log("Nullish coalescing ??", val_2); // default_value

  // call method
  product.describe();

  // Set the value of an existing property:
  product.name = "New Gummy Bears";

  // Lets say we misspelled property name: It silently creates that property!
  // Note that create and update syntax is the same setter syntax.
  product.inStok = false;

  // Add a new property
  product.img = "product.png";

  // Remove an existing property
  delete product.price;

  // let obj_10 = {};
  let obj_10 = { name: "Potter" };
  if (isEmptyObject(obj_10)) {
    console.log("Empty object detected!", obj_10);
  } else {
    console.log("Object is not empty!", obj_10);
  }

  // iterate over properties of an object:
  iterateOverProperties(product);

  // We can use multiword property names, but then they must be quoted.
  let user = {
    name: "John",
    "likes birds": true,
    "8:30": "wake up",
  };

  // square bracket notation provide a way to obtain the property name as the "result of any expression"
  // Here, the variable key may be calculated at run-time or depend on the user input.
  // And then we use it to access the property. That gives us a great deal of flexibility.
  let key = "likes birds";
  user[key] = true;

  const square = {
    area(side) {
      return side * side;
    },
    perimeter(side) {
      return 4 * side;
    },
  };

  // In JavaScript, if you have an object, and ask for a property that doesn't exist
  // (access a property that doesn’t exist), you’ll get the value undefined rather than a runtime error.
  console.log("access a property that doesn't exist: ", square.name); // undefined

  // member function call using dot notation:
  console.log("square.area(10): " + square.area(10));

  // member function call using brackets:
  console.log("square['perimeter'](10): " + square["perimeter"](10));

  const numBox = {
    value: 10,
    // Arrow functions do not have their own this context, and instead inherit the this context from their surrounding scope.
    // Therefore, this.value * this.value evaluates to NaN
    // square: () => this.value * this.value,
    square: function () {
      return this.value * this.value;
    },
    // shorthand syntax for binding a function:
    cube() {
      return this.value * this.value * this.value;
    },
  };

  sq = numBox.square();
  cb = numBox.cube();
  console.log("numBox.square(): " + sq);
  console.log("numBox.cube(): " + cb);

  // Example 3 - An object with 3 properties
  const hen = {
    name: "Helen",
    eggCount: 0,
    layAnEgg: function () {
      ++this.eggCount;
      return "EGG";
    },
  };

  console.log(hen.name); // "Helen"
  console.log(hen.layAnEgg()); // "EGG"
  console.log(hen.layAnEgg()); // "EGG"
  console.log(hen.eggCount); // 2
}

function createUserObject_v1(name, username) {
  return { name: name, username: username };
}

function createUserObject_v2(name, username) {
  return { name, username };
}

/*
Returning objects
﻿wrap the object you’re returning with parentheses - missing parentheses are source of countless bugs!
*/
const getAWiz = (house, firstName, lastName) => ({
  house,
  firstName,
  lastName,
});

/*
When you pass an object as an argument to a function, 
the function receives a reference to the original object in memory, not a copy of the object. 
As a result, any changes made to the object within the function will directly affect the original object outside the function.
*/
const modifyObject = (obj) => {
  obj.isModified = true;
};

function passByRef() {
  const wizard = { name: "Potter" };
  modifyObject(wizard);
  console.log(wizard); // { name: 'Potter', isModified: true }
}
// copy, modify, return - without modifying argument:
// wrap the object you’re returning with parentheses - missing parentheses are source of countless bugs!
const returnAModifiedCopy = (person) => ({
  ...person,
  isModified: true,
});

function propertyValueShorthand() {
  // In real code, we often use existing variables as values for properties.
  // and the name of the property is often the name of the variable.
  // The use-case of making a property from a variable is so common,
  // that there’s a special property value shorthand to make it shorter: { variable1, variable2, ...}

  let name = "Potter";
  let username = "TheWizardingWhiz";

  let user1 = { name: name, username: username }; // properties have the same name as variables.
  let user2 = { name, username }; // shorthand.

  console.log(user1.name, user1.username); // Potter TheWizardingWhiz
  console.log(user2.name, user2.username); // Potter TheWizardingWhiz

  // object destructuring
  const std = getAWiz("Slytherin", "Draco", "Malfoy");
  console.log("typeof(std):", typeof std, "std:", std);

  const { house, ...details } = getAWiz("Gryffindor", "Harry", "Potter");
  console.log("Type:", typeof details, details);
}

/*
Functions are not bound to any specific object. 
On the other hand, methods are functions bound to an object. 
In other words, methods are defined inside an object, which differentiates them from normal functions. 
*/
function methodBasics() {
  // Method definition in object literals
  // v1 - use PropertyName directly
  // propertyName() { }
  const greeter = {
    sayHi() {
      console.log("hello, there!");
    },
  };

  greeter.sayHi();

  // v2 - function defined on object through function expressions:
  const circle = {
    radius: 10,
    // Since functions are objects, they can be used like any other value.
    // If a value is a function, it is called a 'method'.
    // propertyName: function() {}
    area: function () {
      return Math.PI * this.radius ** 2;
    },

    // Method definition in object literals
    perimeter() {},
  };

  console.log("circle.radius", circle.radius, "circle.area()", circle.area());
}

// objectBasics();
objectIdentity();
// propertyValueShorthand();
// checkIfPropertyExists();
// methodBasics();
// passByRef();
