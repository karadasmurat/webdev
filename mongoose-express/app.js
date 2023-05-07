// user info
const sec = require('./lib/env');

// import the Product model
const {
    Farm,
    Product
} = require('./model/FarmProducts');


// The app object conventionally denotes the Express application. 
const express = require('express');
const app = express();

// The Path module provides a way of working with directories and file paths.
const path = require('path');

// web forms has method="POST"
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

const mongoose = require('mongoose');

const EXPRESS_PORT = 3000;
const HOST = '127.0.0.1';
const MONGO_PORT = '27017';
const DBASE = 'farmstand';
const LOCAL_CONN_STR = `mongodb://${HOST}:${MONGO_PORT}/${DBASE}`;
const ATLAS_CONN_STR = `mongodb+srv://${sec.MONGO_USER}:${sec.MONGO_PASS}@dev-cluster.ct6sszv.mongodb.net/test`;
const options = {};


mongoose.connect(ATLAS_CONN_STR, options)
    .then(console.log("Connected to mongodb."))
    .catch(error => console.log("Error " + error));



// Set the "views" directory, relative to this file
// If you run the express app from another directory, it’s safer to use the absolute path of the directory 
app.set('views', path.join(__dirname, '/views'));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serving static files in Express
// here, we use a top-level directory named "public"
// app.use(express.static("public"));
// If you run the express app from another directory, it’s safer to use the absolute path of the directory that you want to serve:
app.use(express.static(path.join(__dirname, 'public')));

// express.json([options])
// built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json());

// parse form
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({
    extended: true
}));



// GET /hello
app.get('/hello', (req, res) => {
    res.send('Hello, there!')
});

// GET all products
// Note - async callback handler - await mongooose and then response.
app.get('/products', async (req, res) => {
    const filter_category = req.query.category;
    let products = {};
    if (filter_category && filter_category != 'All Categories') {
        products = await Product.find({
            category: filter_category
        });
    } else {
        products = await Product.find({});
    }

    // console.log(products);
    res.render('products/index.ejs', {
        products
    });
})

// GET all farms
// Note - async callback handler - await mongooose and then response.
app.get('/farms', async (req, res) => {
    // const filter_category = req.query.category;
    // let products = {};
    // if (filter_category && filter_category != 'All Categories') {
    //     products = await Product.find({
    //         category: filter_category
    //     });
    // } else {
    //     products = await Product.find({});
    // }

    const farms = await Farm.find({});

    // console.log(products);
    res.render('farms/index.ejs', {
        farms
    });
})


// Route parameters are named URL segments
// The captured values are populated in the req.params object
app.get('/products/:id', async (req, res) => {

    // console.log("GET /products/:id");

    // using the id from the route, read existing product
    // note that a Product has a ref property to Farm, so we use .populate('property') to get Farm details:
    const product_id = req.params.id;
    const product = await Product.findById(product_id).populate('farm');
    // console.log(product);

    res.render('products/product_details.ejs', {
        product
    });

    // if (!product) {
    //     // If not found, return 404 error
    //     return res.status(404).send('Product not found');
    // } else {
    //     res.status(200).send('Product found');
    // }

    // If todo is found, return it as JSON
    // res.json(product);

});

// Create Product Part 1
// GET the form, in order to create a todo
app.get("/forms/products/create", (request, response) => {
    //console.log("GET /products/create");
    response.render('products/create_product.ejs', {});
});

// Create Product of a Farm Part 1
// GET the form, in order to create a todo
app.get("/farms/:fid/products/create", (req, res) => {

    // get farmID from route, and pass it to page
    const farm_id = req.params.fid;
    res.render('products/create_product.ejs', {
        farm_id
    });
});

// Create Farm Part 1
// GET the form, in order to create a todo
app.get("/farms/create", (request, response) => {
    response.render('farms/create_farm.ejs', {});
});

// Create Product Part 2
app.post('/products', async (req, res) => {
    console.log(req.body);
    const {
        name,
        price,
        category
    } = req.body;

    // create a model object, and save
    const new_product = new Product({
        name,
        price,
        category
    });
    await new_product.save();

    console.log(new_product);

    // res.send(req.body);
    // res.send(new_product);
    //res.send('POST /products')

    // redirect to list all products after saving:
    res.redirect('/products');
});

// Create Product of a Farm Part 2
app.post('/farms/:fid/products', async (req, res) => {

    // res.send(req.body);

    // get farmID from route
    const farm_id = req.params.fid;

    // findById existing farm, and connect with the new Product.
    const farm = await Farm.findById(farm_id);
    // res.send(farm);


    const {
        name,
        price,
        category
    } = req.body;

    // create a model object, and save
    const new_product = new Product({
        name,
        price,
        category
    });

    // connect the farm with the new Product, on both ends:
    farm.products.push(new_product);
    new_product.farm = farm;

    // save both ends of relation
    await new_product.save();
    await farm.save();

    console.log(new_product);

    // res.send(req.body);
    // res.send(new_product);
    //res.send('POST /products')

    // redirect to list all products after saving:
    res.redirect(`/farms/${farm._id}`);
});

// Create Farm Part 2
app.post('/farms', async (req, res) => {

    // console.log(req.body);

    // we use input names farm[name], farm[city] etc
    const new_farm = new Farm(req.body.farm);
    await new_farm.save();

    // redirect to list all products after saving:
    res.redirect('/farms');
});

// READ specific farm
// Note the order of this, since the URL has a parameter, not to catch any similar pattern (i.e. /farms/create), this must be last.
// Route parameters are named URL segments
// The captured values are populated in the req.params object
app.get('/farms/:id', async (req, res) => {

    // using the id from the route, read existing farm
    // note that a Farm has an array of ObjectIds for related Products, so we use populate() to get Product details
    const farm_id = req.params.id;
    const farm = await Farm.findById(farm_id).populate('products');
    // console.log(selectedFarm);

    res.render('farms/farm_details.ejs', {
        farm
    });

    // if (!product) {
    //     // If not found, return 404 error
    //     return res.status(404).send('Product not found');
    // } else {
    //     res.status(200).send('Product found');
    // }

    // If todo is found, return it as JSON
    // res.json(product);

});

// UPDATE Part 1
// GET the form 
app.get("/products/:id/update", async (req, res) => {
    // find the product
    const id = req.params.id;
    const product = await Product.findById(id);

    // render the page with this product
    res.render('products/update_product.ejs', {
        product
    });
});

// UPDATE Part 2
// PUT 
// Note that form has POST method, so will use method-override
app.put("/products/:id", async (req, res) => {
    console.log("PUT /products/:id");

    // construct an object from using the form:
    const id = req.params.id;
    console.log(id);

    const updated_product = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category
    };
    console.log(updated_product);

    const filter = {
        _id: id
    };

    const result = await Product.findOneAndUpdate(filter, updated_product);
    // console.log(result);

    // We could also use findByIdAndUpdate and use req.body directly
    // const product = await Product.findByIdAndUpdate(id, req.body, {
    //     runValidators: true,
    //     new: true
    // });


    // redirect to list all products after saving:
    res.redirect('/products');
});


// DELETE
// Note that form has POST method, so will use method-override
app.delete("/products/:id", async (req, res) => {
    console.log("DELETE /products/:id");

    try {
        const id = req.params.id;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).send({
                error: 'Product not found'
            });
        }
        // redirect to list all products after saving:
        res.redirect('/products');
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: 'Internal server error'
        });
    }

});


// bind and listen for connections on the specified host and port.
// identical to Node’s http.Server.listen()
app.listen(EXPRESS_PORT, () => {
    console.log(`mongoose-express app listening on port ${EXPRESS_PORT}`)
});