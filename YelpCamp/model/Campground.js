const mongoose = require('mongoose');
// const {Schema} = require('mongoose');

// With Mongoose, everything is derived from a Schema. 
const campgroundSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    image: String,
    price: Number,
    description: String,
    location: String,
    reviews: [{ // an array containing references to children
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }]

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


const reviewSchema = new mongoose.Schema({
    body: {
        type: String,
    },
    rating: Number,
    campground: { // fk references Farm
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Campground'
    }

}, {
    // In Mongoose, the timestamps option is a built-in feature that allows you to automatically create and update the createdAt and updatedAt fields for a schema. 
    timestamps: true
});


// Creating and exporting model
// To use our schema definition, we need to convert our Schema into a Model we can work with.
// To do so, we pass it into mongoose.model(modelName, schema):
const Campground = mongoose.model('Campground', campgroundSchema);
const Review = mongoose.model('Review', reviewSchema);



// export the model from Mongoose schema using CommonJS syntax
module.exports = {
    Campground,
    Review
}