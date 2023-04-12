class Animal{

    constructor(name){
        this.name = name;
    }

    speak(){
        console.log("I can make noise");
    }

    greet(){
        console.log(`Hi! This is ${this.name}.`);
    }
}

class Dog extends Animal{

    constructor(name){
        super(name);
    }

    speak(){
        console.log("I can bark!");
    }

}

class Cat extends Animal{

    constructor(name){
        super(name);
    }

    speak(){
        // The super keyword is used to call corresponding methods of super class.
        super.speak();
        console.log("I can meow!");

    }
}

let myAnimal = new Animal("Animal");
myAnimal.greet();
myAnimal.speak();

let myDog = new Dog("Dog");
// function defined in superclass
myDog.greet();
myDog.speak();

let myCat = new Cat("Cat");
myCat.greet();
myCat.speak();