const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");


// You're free to define your User how you like. 
// Passport-Local Mongoose will add a username, hash and salt field to store the username, the hashed password and the salt value.
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);