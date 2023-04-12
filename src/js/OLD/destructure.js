const person = {
    firstName: "Joe",
    lastName: "Bar",
    age: 40,
    favorites: ["Apple", "Bananas", "Strawberry"]
};

// Destructuring the object
const {firstName, favorites} = person;

console.log(firstName);
console.log(favorites[0]);