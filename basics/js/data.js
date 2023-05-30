"use strinct";
// we will export this array of objects.

const car_kia = {
  make: "KIA",
  model: "Sorento",
  yeear: 2007,
};

const car_troc = {
  make: "Volkswagen",
  model: "T-ROC",
  yeear: 2019,
};

const cars = [car_kia, car_troc];

const hp_students = ["Harry", "Hermione", "Ron", "Draco"];

const fruitNames = [
  "apple",
  "banana",
  "orange",
  "grape",
  "strawberry",
  "mango",
  "watermelon",
  "pineapple",
  "kiwi",
  "pear",
];

const vegetableNames = [
  "carrot",
  "broccoli",
  "tomato",
  "cucumber",
  "spinach",
  "potato",
  "onion",
  "pepper",
  "zucchini",
  "celery",
];

const person = { name: "John", birth_year: 1990 };
const contact = {
  email: "john@example.com",
  address: { city: "London", country: "United Kingdom" },
};

module.exports = {
  car_kia,
  car_troc,
  cars,
  person,
  contact,
  fruitNames,
  vegetableNames,
  hp_students,
};
