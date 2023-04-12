// Class declaration
// Naming convention: begin with an uppercase character 
class Car {

    // The constructor method is a special method for creating and initializing an object created with a class. 
    // There can only be one special method with the name "constructor" in a class.
    // The constructor function is called automatically when the object is initialized.
    constructor(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
    }

    // Method
    introduce(){
        const defn = `${this.make} ${this.model} ${this.year}`;
        console.log(defn);
        return defn;
    }

}

//Create an object called "mycar" based on the Car class
const myCar = new Car("BMW");
myCar.introduce();

const myCar2 = new Car("Ford", "Mustang", "1964");
myCar2.introduce();