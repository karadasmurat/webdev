const mongoose = require('mongoose');

// With Mongoose, everything is derived from a Schema. 
const blogSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        lowercase: true,
        enum: ['fruit', 'vegetable', 'dairy']
    }
});

// Creating a model
// To use our schema definition, we need to convert our blogSchema into a Model we can work with.
// To do so, we pass it into mongoose.model(modelName, schema):
const Product = mongoose.model('Product', blogSchema);

// export the Blog model from Mongoose schema using CommonJS syntax
module.exports = Product;