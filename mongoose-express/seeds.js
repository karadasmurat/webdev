const mongoose = require('mongoose');

// import the Product model
const Product = require('./model/Product');


const HOST = '127.0.0.1';
const MONGO_PORT = '27017';
const DBASE = 'farmstand';
const options = {};

// connect the 'test' database running locally on the default port (27017):
mongoose.connect(`mongodb://${HOST}:${MONGO_PORT}/${DBASE}`, options)
    .then(console.log("Connected to " + DBASE + " running on " + HOST))
    .catch(error => console.log("Error " + error));

// const p = new Product({
//     name: 'Ruby Grapefruit',
//     price: 1.99,
//     category: 'fruit'
// });

// p.save()
//     .then(p => console.log(p))
//     .catch(e => console.log(e));


const seedProducts = [{
    name: 'Fairy Eggplant',
    price: 1.00,
    category: 'vegetable'
}, {
    name: 'Organic Goddess Melon',
    price: 4.99,
    category: 'fruit'
}, {
    name: 'Organic Mini Seedless Watermelon',
    price: 3.99,
    category: 'fruit'
}, {
    name: 'Organic Celery',
    price: 1.50,
    category: 'vegetable'
}, {
    name: 'Chocolate Whole Milk',
    price: 2.69,
    category: 'dairy'
}];

Product.insertMany(seedProducts)
    .then(res => console.log(res))
    .catch(e => console.log(e));