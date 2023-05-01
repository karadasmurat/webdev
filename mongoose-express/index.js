const express = require('express');

// The app object conventionally denotes the Express application. 
const app = express();

// The Path module provides a way of working with directories and file paths.
const path = require('path');

const mongoose = require('mongoose');

const EXPRESS_PORT = 3000;
const HOST = '127.0.0.1';
const MONGO_PORT = '27017';
const DBASE = 'farmstand';

// import the Product model
const Product = require('./model/Product');

const options = {};

// connect the 'test' database running locally on the default port (27017):
mongoose.connect(`mongodb://${HOST}:${MONGO_PORT}/${DBASE}`, options)
    .then(console.log("Connected to " + DBASE + " running on " + HOST))
    .catch(error => console.log("Error " + error));



// Set the "views" directory, relative to this file
// If you run the express app from another directory, it’s safer to use the absolute path of the directory 
app.set('views', path.join(__dirname, '/views'));

// Set EJS as the view engine
app.set('view engine', 'ejs');



// Respond to GET request on the root route (/):
app.get('/hello', (req, res) => {
    res.send('Hello, there!')
})

// Respond to GET request on the root route (/):
// Note - async callback handler - await mongooose and then response.
app.get('/products', async (req, res) => {
    const products = await Product.find();
    // console.log(products);
    res.render('products/index.ejs', {
        products
    });
})


// Route parameters are named URL segments
// The captured values are populated in the req.params object
app.get('/products/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const product = await Product.findById(id);
    console.log(product);

    res.render('products/product.ejs', {
        product
    })

    // if (!product) {
    //     // If not found, return 404 error
    //     return res.status(404).send('Product not found');
    // } else {
    //     res.status(200).send('Product found');
    // }

    // If todo is found, return it as JSON
    // res.json(product);

});

// bind and listen for connections on the specified host and port.
// identical to Node’s http.Server.listen()
app.listen(EXPRESS_PORT, () => {
    console.log(`mongoose-express app listening on port ${EXPRESS_PORT}`)
});