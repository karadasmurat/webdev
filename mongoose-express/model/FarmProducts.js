// modeling a parent, with an array of child references:

const mongoose = require('mongoose');

// parent
// modeling a parent, with an array of child references:
const farmSchema = new mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: [true, "Farm must have a name."]
    },
    city: String,
    email: {
        type: String,
        required: [true, 'Email is required.']
    },

    // Modeling a relation:
    // shall we embed products in farms? 
    // Q1: do we have an "all products" page? Yes. then do not embed - use a seperate collection.
    // Q2: will you have a farm page with all products frequently listed? Yes. Then use an array of IDs.
    products: [{ // an array of child references
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
});

// child
const productSchema = new mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number,
    category: {
        type: String,
        enum: ['fruit', 'vegetable', 'dairy']
    },
    season: {
        type: String,
        enum: ['Spring', 'Summer', 'Fall', 'Winter']
    },
    farm: { // fk references Farm
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farm'
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});


const Farm = mongoose.model('Farm', farmSchema);
const Product = mongoose.model('Product', productSchema);


module.exports = {
    Farm,
    Product
}