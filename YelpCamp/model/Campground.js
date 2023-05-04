const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// With Mongoose, everything is derived from a Schema. 
const campgroundSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    image: String,
    price: Number,
    description: String,
    location: String,

    // price: {
    //     type: Number,
    //     required: true,
    //     min: 0
    // },

    // category: {
    //     type: String,
    //     lowercase: true,
    //     enum: ['fruit', 'vegetable', 'dairy']
    // }
});

// Creating and exporting model
// To use our schema definition, we need to convert our Schema into a Model we can work with.
// To do so, we pass it into mongoose.model(modelName, schema):

// export the model from Mongoose schema using CommonJS syntax
module.exports = mongoose.model('Campground', campgroundSchema);