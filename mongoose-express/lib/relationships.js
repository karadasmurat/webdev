const {
    Author,
    Book

} = require("../model/Book");

const {
    Farm,
    Product
} = require("../model/FarmProducts");

// TODO book data from json
const book_from_json = require("./data/books.json");

// user info
const sec = require('./env');
const mongoose = require('mongoose');
const LOCAL_CONN_STR = `mongodb://127.0.0.1:27017/test`;
const ATLAS_CONN_STR = `mongodb+srv://${sec.MONGO_USER}:${sec.MONGO_PASS}@dev-cluster.ct6sszv.mongodb.net/test`;
const options = {};

mongoose.connect(ATLAS_CONN_STR, options)
    .then(console.log("Connected to mongodb."))
    .catch(error => console.log("Error " + error));


const reset = async (...models) => {


    for (let model of models) {
        try {
            console.log("dropping: " + model.modelName);
            model.collection.drop();
        } catch (error) {
            console.log("ERROR DROPPING COLLECTION: " + error)
        }

    }
}

const saveRefs = async () => {

    reset(Author, Book);

    const author = new Author({
        name: 'J.K. Rowling'
    });

    console.log("Created model instance:" + author);
    /* 
        {
            name: 'J.K. Rowling',
            books: [],
            _id: new ObjectId("64571cd174b7b7c1a82978c6")
        } 
    */


    const book = new Book({
        title: "Harry Potter",
        // set child option 1 - set fk as id
        //author: author._id
    });

    console.log("Created model instance:" + book);
    /*
        {
            title: "Harry Potter and the Philosopher's Stone",
            _id: new ObjectId("64571e0afda371cb1d28d933")
        }
    */

    // set child option 2 - set fk as model
    book.author = author;
    console.log("Updated model instance:" + book);
    /* author looks like an embedded document, but it will be a ref on db document when saved!
    {
        title: "Harry Potter and the Philosopher's Stone",
        _id: new ObjectId("64571e554d3be61bd1fbf038"),
        author: {
            name: 'J.K. Rowling',
            books: [],
            _id: new ObjectId("64571e554d3be61bd1fbf037")
        }
    }
    */

    // update parent for the children array:
    author.books.push(book._id);

    // save parent
    await author.save();

    // save child. 
    // Note that saving parent is not enough for the child record (document)
    // Parent document will have a ref in the array, since we set the author._id.
    // However, there will not be a corresponding record (document) in child collection.
    await book.save();

}

const getRefs = async () => {

    const book = await Book.findOne({
        title: 'Harry Potter'
    }).populate('author').exec();

    if (!book) {
        console.log("NOT FOUND");
    } else {
        // console.log("FOUND BOOK!");
        console.log(book);
        console.log(book.author.name);
    }

}

const saveFarm = async () => {

    const farm1 = new Farm({
        name: "Farm Atlas 1",
        city: "Alaska"
    });
    // console.log("model instance created: " + farm1);


    const product1 = new Product({
        name: "Melon Atlas 1",
        price: 4.99,
        season: "Summer"
    });
    // console.log("model instance created: " + product1);



    const product2 = new Product({
        name: "Apple",
        price: 2.99,
        season: "Winter"
    });


    const product3 = new Product({
        name: "Grapes",
        price: 3.99,
        season: "Summer"
    });

    await product1.save();
    await product2.save();
    await product3.save();



    farm1.products.push(product1);
    farm1.products.push(product2);
    farm1.products.push(product3);
    await farm1.save();

    // console.log(farm1);

}


saveRefs().then(() => getRefs());
// saveFarm();