class Car {
  // name is a private member variable
  public constructor(private _name: string) {}

  // conventional getter, like Java:
  // usage: myCar.getName()
  public getName(): string {
    return this._name;
  }

  // getter
  // usage: myCar.name
  get name(): string {
    return this._name;
  }
}

const car = new Car("BMW");
console.log("car.getName()", car.getName());
console.log("car.name", car.name);

class Person {
  name: string;
  instantiatedAt = new Date(); // default value to a property

  constructor(name: string) {
    this.name = name;
  }
}

class Product {
  private _code: string = "N/A";

  get code() {
    return this._code;
  }
}

const person = new Person("Potter");
person.name;

// define class members in the constructor
class Book {
  constructor(public ISBN: string, public title: string) {}
}

const book = new Book("123345", "Animal Farm");
console.log(book.title);

// Getters
class Student {
  // define class members in the constructor
  constructor(private _firstname: string, private _lastname: string) {}

  // getter, Java style
  // std.getFirstname()
  getFirstname(): string {
    return this._firstname;
  }

  // getter
  // as if we declare  a property named "firstname" : std.firstname
  get firstname(): string {
    return this._firstname;
  }

  // getter for a computed variable
  // as if we declare  a property named "fullname" : std.fullname
  get fullname(): string {
    return `${this._firstname} ${this._lastname.toUpperCase()}`;
  }
}

const std = new Student("Harry", "Potter");
console.log("std.getFirstname()", std.getFirstname()); // Harry
console.log("std.firstname", std.firstname); // Harry
console.log("std.fullname", std.fullname); // Harry POTTER

class Point {
  x: number;
  y: number;

  // constructor with defaults
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  // method
  scale(n: number): void {
    this.x *= n;
    this.y *= n;
  }
}

interface Logger {
  log(message: string): void;
}

class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log(message);
  }
}

const logger: Logger = new ConsoleLogger();
logger.log("Hello, TypeScript!");

// Abstract base class
abstract class Pet {
  // we can use constructor shorthand
  // private _name: string;
  // private _age?: number;

  // define a protected class member in the constructor:
  constructor(private _name: string, private _age?: number) {}

  // abstract method: without an implementation
  abstract makeSound(): void;

  // a method with a default implementation
  petInfo(): string {
    const info = this._age
      ? `This is ${this._name}, ${this._age} years old.`
      : `This is ${this._name}.`;
    console.log(info);
    return info;
  }

  // a public interface that lets other parties to set age value.
  set age(value: number) {
    if (value < 0 || value > 200) {
      throw new Error("Invalid Argument: Age cannot be negative.");
    }

    this._age = value;
  }
}

// Dog class - a concrete implementation extending Pet
class Dog extends Pet {
  // we can use constructor shorthand
  // private breed: string;

  constructor(name: string, private _breed: string) {
    super(name);
    // we could set a default argument for Animal constructor, without the need for a second parameter.
    // super("Canis familiaris");

    // we can use constructor shorthand
    // this.breed = breed;
  }

  // Subclass specific method.
  bark() {
    console.log("Woof woof!");
  }

  // Method Overriding in subclass - Runtime Polymorphism
  // use override keyword to explicitly state that you intend to override a method from superclass.
  override makeSound(): void {
    this.bark();
  }
}

class Cat extends Pet {
  // we can use constructor shorthand
  // private _breed: string;

  constructor(name: string, private _breed: string) {
    super(name);
    // we could set a default argument for Animal constructor, without the need for a second parameter.
    // super("Canis familiaris");

    // we can use constructor shorthand
    // this._breed = breed;
  }

  // Subclass specific method.
  extendClaws() {
    console.log("Claws extended. Ready to attack!");
  }

  // Subclass specific method.
  meow() {
    console.log("Meow!");
  }

  override makeSound(): void {
    this.meow();
  }
}

// petdog: use a Pet reference to a Dog Type
const petdog: Pet = new Dog("Petdog", "Bulldog");
petdog.makeSound(); // Woof woof!
petdog.petInfo(); // This is Rex.

// petcat: use a Pet reference to a Cat Type
const petcat: Pet = new Cat("Petcat", "Persian");
petcat.age = 5;
// petcat.extendClaws(); // ERR : Property 'extendClaws' does not exist on type Pet !!

// use a Cat reference to a Cat Type
const cat: Cat = new Cat("Garfield", "Persian");
cat.extendClaws();

// an Array of 'Pet' instances
const pets: Pet[] = [];

// we can push Pet, Cat or Dog Types into a Pet array
pets.push(petdog); // Pet
pets.push(petcat); // Pet
pets.push(cat); // Cat
pets.push(new Dog("Rex", "German Shepherd")); // Dog

console.log("traverse Pet array:");
for (let p of pets) {
  p.petInfo();
  p.makeSound();
}

// Interface
interface Printable {
  numberOfCopies: number;
  print(): void;
}

class PaperWork implements Printable {
  // private internal implementation, will be accessed by public get/set
  private _numberOfCopies: number;

  constructor() {
    this._numberOfCopies = 0; // default
  }

  // note that we are not overriding,
  // we do not extend a base class with this method, we implement interface.
  print(): void {
    const msg =
      this._numberOfCopies !== 0
        ? `Printing ${this._numberOfCopies} copies`
        : "Select number of copies to print";
    console.log(msg);
  }

  // public implementation of variable in the interface with getter/setter
  // we may prefer setter to validate arguements.
  get numberOfCopies() {
    return this._numberOfCopies;
  }

  // public implementation of variable in the interface
  set numberOfCopies(value: number) {
    this._numberOfCopies = value < 0 ? 0 : value;
  }
}

const printabledoc: Printable = new PaperWork();
printabledoc.print(); // Select number of copies to print

const doc: PaperWork = new PaperWork();
doc.numberOfCopies = 3;
doc.print(); // Printing 3 copies

// Example - Housework class to extend Chore and implement Assignable.
// Notice that an instance of Housework could be referenced by Types Chore, Assignable and Housework itself.
abstract class Chore {
  constructor(protected _name: string) {}

  abstract start(): void;

  get name() {
    return this._name;
  }
}

interface Assignable {
  assignTo(assignee: string): void;
}

class Housework extends Chore implements Assignable {
  constructor(name: string) {
    super(name);
  }

  // abstract method implementation
  override start(): void {
    console.log("Start working on " + this._name);
  }

  assignTo(assignee: string): void {
    console.log(`Assigning housework "${this._name}" to ${assignee}`);
  }

  complete(): void {
    console.log(`Completing housework "${this._name}"`);
  }
}

// Notice that an instance of Housework could be referenced by Types Chore, Assignable and Housework itself.

// 1. reference to Chore - base class
const chore: Chore = new Housework("Doing the laundry");
chore.start(); // "Start working on Doing the laundry"
// chore.assignTo("Weasley"); //ERR 'assignTo' not exist on type 'Chore'

// 2. reference to Assignable - interface
const assignable: Assignable = new Housework("Vacuuming");
// assignable.start(); //ERR 'start' not exist on the type 'Assignable'
assignable.assignTo("Voldemort");

// 3. reference to Housework - instance of class, extending Chore, implementing Assignable
const housework = new Housework("Washing the dishes");
housework.start();
housework.assignTo("Weasley");

// Example - instances of different classes can have the same type
// as different classes can implement the same interface.
interface Chargeable {
  charge(): void;
}

class ElectricCar implements Chargeable {
  charge(): void {
    console.log("Charging car.");
  }
}

class MobilePhone implements Chargeable {
  charge(): void {
    console.log("Charging mobile phone.");
  }
}

// Notice that we can put instances of different classes in the Chargeable[], as they both implement the same interface:
const chargeables: Chargeable[] = [];
chargeables.push(new ElectricCar());
chargeables.push(new MobilePhone());

for (let c of chargeables) {
  c.charge();
}

// GENERICS
// Generic functions - we pass T as type parameter
// v1 - strict type
function printData_specific(data: number) {
  console.log("data: ", data);
}

// v2 - a more general type by union:
function printData_moregeral(data: number | string) {
  console.log("data: ", data);
}

// v3 - generic function where type information will be passed like parameters
function printData_generic<T>(data: T) {
  console.log("data: ", data);
}

printData_specific(10);
// printData_specific("Ten"); // ERR Argument of type 'string' is not assignable to parameter of type 'number'

printData_moregeral(11);
printData_moregeral("Eleven");
// printData_moregeral(true); // ERR Argument of type 'boolean' is not assignable to parameter of type 'string | number'

printData_generic(11);
printData_generic("Eleven");
printData_generic(true);

// Generic Class
// we pass T as type parameter
class Box<T> {
  constructor(public item: T) {}

  info(): void {
    console.log("Box contents: ", this.item);
  }
}

const stringBox = new Box<string>("One");
const numberBox = new Box<number>(1);

stringBox.info(); // Box contents:  One
numberBox.info(); // Box contents:  1

// Generic interface
// we pass T as type parameter
interface Result<T> {
  data: T | null;
  error: string | null;
}

// 2 Types that we'll pass to generic interface as parameters
type TypeOne = {
  name: string;
};

type TypeTwo = {
  title: string;
};

// when we pass T as type parameter, it will mock return Result<T>
function giveMeResults<T>(): Result<T> {
  return { data: null, error: null };
}

// note that res1 is of type Result<TypeOne>
const res1 = giveMeResults<TypeOne>();
res1.data?.name;

// note that res1 is of type Result<TypeTwo>
const res2 = giveMeResults<TypeTwo>();
res2.data?.title;
