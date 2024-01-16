/*
objects are used to store keyed collections of various data and more complex entities.
An empty object(“empty cabinet”) can be created using one of two syntaxes:

    let user = new Object();    // "object constructor" syntax
    let user = {};              // "object literal" syntax


    let user = { 
        name: "John",
        age: 30
    };

JavaScript objects are dynamic "bags" of properties (referred to as own properties):

    // add a property
    user.isAdmin = true;

    // delete a property
    delete user.age;

    // Property values are accessible using the dot notation:
    console.log(user.isAdmin); // true

Note that in JavaScript, any function can be added to an object in the form of a property:

    // version 1 - fname: function(){}
    const student = {
        name: "MK",
        greet: function () {
            console.log(`Hi, this is ` + this.name);
        }
    }

    // version 2 - fname(){}
    const myCity = {
        city: "Madrid",
        greet() {
            console.log(`Greetings from ${this.city}`);
        },
    };


Methods are nothing more than properties that hold function values. This is a simple method:

    let rabbit = {};
    rabbit.speak = function (line) {
        console.log(`The rabbit says '${line}'`);
    };

    rabbit.speak("I'm alive.");
    // → The rabbit says 'I'm alive.'

Note that the object is stored somewhere in memory (at the right of the picture), while the user variable(at the left) has a “reference” to it.

let user = {
    name: "John"
};

let admin = user; // copy the reference. There’s still one object, but now with two variables that reference it.

PROTOTYPE
---------
In prototype-based languages there are no explicit classes.
Objects inherit directly from other objects through a prototype property.

In class-based languages, a new instance is constructed through a class's constructor function, 
a special function that reserves a block of memory for the object's members (properties and methods) and returns a reference to that block.
An optional set of constructor arguments can be passed to the function and are usually held in properties.
The resulting instance will inherit all the methods and properties that were defined in the class, which acts as a kind of template from which similarly typed objects can be constructed.

ECMAScript 6 introduced classes as syntactic sugar over JavaScript's existing prototype-based inheritance, providing an alternative way to create objects and manage inheritance.

 If you type the object 's name followed by a period into the console, like user., then the console will pop up a list of all the properties available to this object. 
 You 'll see that there are lots of other properties! Try accessing one of them:

    user.toString(); // "[object Object]"

Every object in JavaScript has a built-in property, which is called its "prototype". 
The prototype is itself an object, so the prototype will have its own prototype, making what 's called a prototype chain. 
The chain ends when we reach a prototype that has null for its own prototype.

What is the prototype for an object? To find out, we can use the function 

    Object.getPrototypeOf(user); // Object { }

When you try to access a property of an object: if the property can 't be found in the object itself, the prototype is searched for the property. 
If the property still can't be found, then the prototype 's prototype is searched, and so on until either the property is found, or the end of the chain is reached, in which case undefined is returned.

So when we call user.toString(), the browser:
 - looks for toString in user
 - can 't find it there, so looks in the prototype object of myObject for toString 
 - finds it there, and calls it.


Note that it's common to see a pattern, in which methods are defined on the prototype, but data properties are defined in the constructor.
That's because methods are usually the same for every object we create, while we often want each object to have its own value for its data properties.

Prototypes are useful for defining properties for which all instances of a class share the same value, such as methods.
Properties that differ per instance, such as our cat's breed property, need to be stored directly in the objects themselves.

    // constructor function 
    function Rabbit(type) {
        this.type = type;
    }
    // Constructors (all functions, in fact) automatically get a property named prototype, which by default holds a plain, empty object that derives from Object.prototype
    // The prototype object used when constructing objects is found by taking the "prototype property of the constructor function":
    Rabbit.prototype.speak = function (line) {
        console.log(`The ${this.type} rabbit says '${line}'`);
    };

    // If you put the keyword new in front of a function call, the function is treated as a constructor:
    let weirdRabbit = new Rabbit("weird");

Class notation
So JavaScript classes are constructor functions with a prototype property.
That is how they work, and until 2015, that was how you had to write them. These days, we have a less awkward notation:
The method named "constructor" is treated specially. It provides the actual constructor function:

    class Rabbit {
        constructor(type) {
            this.type = type;
        }
        speak(line) {
            console.log(`The ${this.type} rabbit says '${line}'`);
        }
    }

    let killerRabbit = new Rabbit("killer");



Inheritance
-----------
Inheritance models what is called an IS - A relationship.
Inheritance is the mechanism you’ll use to create hierarchies of related classes.
These related classes will share a common interface that will be defined in the base classes.
Derived classes can specialize the interface by providing a particular implementation where applies.

Let’s say we have a base class Pet and you derive from it to create a Cat class.
The inheritance relationship states that a Cat is a Pet.
This means that Cat inherits the interface and implementation of Pet, and Cat objects can be used to replace Pet objects in the application.
This is known as the Liskov substitution principle. (SOLID Principles)
*/

class Box {
  // Constructor
  constructor(capacity) {
    this.capacity = capacity;
    this.size = 0;
  }

  // Methods are created on Box.prototype
  getCapacity() {
    return this.capacity;
  }

  load(amount) {
    if (this.size + amount >= this.capacity) {
      console.log("Sorry, the capacity limit has been reached.", amount);
    } else {
      console.log("Loading", amount);
      this.size += amount;
    }
  }
}

// constructor default values
// v1 - empty object as a default value in the constructor
class Appliance {
  constructor(code, options = {}) {
    this.code = code;
    this.title = options.title || "Appliance";
    this.age = options.age || 0;
  }
}

// constructor default values
// v2 - empty object as a default value, with object destructuring with default values.
class User {
  // set default values for the config object directly in the parameter list
  // using destructuring with default values.
  constructor(name, email, { theme = "light", notifications = true } = {}) {
    this.name = name;
    this.email = email;
    this.config = { theme, notifications };
  }

  getUserInfo() {
    return `Name: ${this.name}, Email: ${this.email}`;
  }

  getUserSettings() {
    return `Theme: ${this.config.theme}, Notifications: ${this.config.notifications}`;
  }
}

// INHERITANCE
// Superclass - Pet
class Pet {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  eat() {
    console.log(`Pet ${this.name} is eating.`);
  }
}

// Subclass - Cat
class Cat extends Pet {
  constructor(name, age, breed) {
    super(name, age);
    this.breed = breed;
  }

  // specialize
  meow() {
    console.log(`Cat ${this.name} says meow.`);
  }
}

function objectLiterals() {
  let user = {
    name: "John",
    age: 30,
  };

  console.log(user); // { name: 'John', age: 30 }

  // JavaScript objects are dynamic "bags" of properties (referred to as own properties).
  // add a property
  user.isAdmin = true;

  // delete a property
  delete user.age;

  // Property values are accessible using the dot notation:
  console.log(user.isAdmin); // true

  // Property existence test, “in” operator
  if ("age" in user) {
    console.log("age is IN user.");
  } else {
    console.log("age is NOT in user.");
  }

  let a = {};
  let b = a; // copy the reference

  console.log(a == b); // true, both variables reference the same object
  console.log(a === b); // true

  // In JavaScript, any function can be added to an object in the form of a property.
  // version 1 - fname: function(){}
  const student = {
    name: "MK",
    greet: function () {
      console.log(`Hi, this is ` + this.name);
    },
  };

  // version 2 - fname(){}
  // an object with one data property, city, and one method, greet().
  const myCity = {
    city: "Madrid",
    greet() {
      console.log(`Greetings from ${this.city}`);
    },
  };

  student.greet();
}

function propertiesThatHoldFunctionValues() {
  // Methods are nothing more than properties that hold function values:

  let rabbit = {};
  rabbit.speak = function (line) {
    console.log(`The rabbit says '${line}'`);
  };

  rabbit.speak("Hello, there!"); // → The rabbit says 'Hello, there!'
}

function inheritanceBasics() {
  console.log("Inheritance Basics");
  console.log("------------------");

  const myPet = new Pet("rocky", 3);
  myPet.eat();

  // As JavaScript uses duck-typing, you can achieve polymorphism by just having different objects implement the same methods
  // Since weakly-typed, no classical polymorphism
  // Pet myPet = new Cat();

  const fluffy = new Cat("Fluffy", 2, "Persian");
  fluffy.eat(); // Pet Fluffy is eating.
  fluffy.meow(); // Cat Fluffy says meow.
}

function prototypeBasics() {
  /*
    Prototype-based programming is a style of object-oriented programming in which behaviour reuse (known as inheritance) is performed 
    via a process of reusing existing objects that serve as prototypes.
    */

  console.log("Prototype-based programming");
  console.log("---------------------------");

  // An object named employee is created using object literal syntax
  const employee = {
    name: "",
    occupation: "",
    salary: 0,
    getDetails() {
      return `Name: ${this.name}, Occupation: ${this.occupation}, Salary: ${this.salary}`;
    },
  };

  // Inheritance with Object.create:
  // This means mk inherits the properties and methods from employee as its prototype.
  const mk = Object.create(employee);
  mk.name = "MK";
  console.log(mk.getDetails());
}

function constructorFunctions() {
  /*
    Note that this constructor function can be rewritten in classes.
    However, classes are syntax sugar over constructor functions, which means you can still manipulate Box.prototype to change the behavior of all instances.
    */

  console.log("Constructor Functions");
  console.log("---------------------");

  // A constructor function
  function Box(value) {
    this.value = value;
  }

  // Properties all boxes created from the Box() constructor will have
  // note: try arrow function to get "undefined" using "this"
  Box.prototype.getValue = function () {
    return this.value;
  };

  // the constructor function allows us to create multiple similar objects.
  // To create a new instance of the Box, use the "new" operator:
  const boxes = [new Box(1), new Box(2), new Box(3)];
  for (const box of boxes) {
    console.log(box.getValue());
  }
}

function classBasics() {
  /*
    Note that classes are syntax sugar over constructor functions, which means you can still manipulate Box.prototype to change the behavior of all instances.
    */

  console.log("Class Basics");
  console.log("------------");

  const box = new Box(11);
  console.log(box); // Box { capacity: 11, size: 0 }

  box.load(5); // Loading 5
  box.load(10);
  console.log(box); // Box { capacity: 11, size: 5 }

  constructorBasics();
}

function constructorBasics() {
  console.log("constructor Basics");
  console.log("------------------");

  // Creating an instance of User class
  const newUser = new User("Alice", "alice@example.com", {
    theme: "dark", // Custom theme for Alice
  });

  console.log(newUser); // User { name: 'Alice', email: 'alice@example.com', config: { theme: 'dark', notifications: true } }

  const appliance1 = new Appliance("APP01"); // Appliance { code: 'APP01', title: 'Appliance', age: 0 }
  const appliance2 = new Appliance("APP02", { age: 7, dummy: "not expected" });

  console.log(appliance1);
  console.log(appliance2);
}

/************ calls ***************/
// objectLiterals();
// propertiesThatHoldFunctionValues();
prototypeBasics();
// constructorFunctions();
// classBasics();
// inheritanceBasics();
