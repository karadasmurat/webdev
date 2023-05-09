const mongoose = require('mongoose');
// const {Schema} = require('mongoose');

// With Mongoose, everything is derived from a Schema. 
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, 'Username is not available.'],
        required: [true, 'Username required.']
    },
    password: {
        type: String,
        required: [true, 'Password required.']
    },

});


// Creating and exporting model
// To use our schema definition, we need to convert our Schema into a Model we can work with.
// To do so, we pass it into mongoose.model(modelName, schema):
const User = mongoose.model('User', userSchema);


// export the model from Mongoose schema using CommonJS syntax
module.exports = {
    User
}