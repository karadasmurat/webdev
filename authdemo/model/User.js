const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

// const {Schema} = require('mongoose');

// With Mongoose, everything is derived from a Schema.
// check this ?
// Note that here in this schema we did not add any field for password unlike we do normally.
//This is because passport-local-mongoose doesn’t need it.
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "Username is not available."],
    required: [true, "Username required."],
  },
  password: {
    type: String,
    //required: [true, 'Password required.']
  },
  googleId: String,
  displayName: String,
  email: String,
});

// plugin for passport-local-mongoose
// passport-local-mangoose adds fields and methods related to authentication:
// salt, hash properties
// authenticate(), register(), serialize(), deserialize() methods
userSchema.plugin(passportLocalMongoose);
// userSchema.plugin(passportLocalMongoose, {
//     usernameField: 'email'
// });

userSchema.statics.findOrCreate = async function findOrCreate(profile, done) {
  console.log("User.findOrCreate()");
  // console.log(profile);

  try {
    // Find or create the user in the database
    var userObj = new this();
    const existingUser = await this.findOne({
      googleId: profile.googleId, // search using googleId field
      // username: profile.email
    }).exec();

    if (!existingUser) {
      // Create a new user
      console.log("Creating user with Google credentials.");
      const newUser = new User({
        username: profile.email,
        googleId: profile.googleId,
        displayName: profile.displayName,
        email: profile.emails[0].value,
        // Set any other user properties from the profile if needed
      });

      await newUser.save();
      done(null, newUser);
    } else {
      console.log("Existing User with related Google credentials is found.");
      done(null, existingUser);
    }
  } catch (error) {
    done(error);
  }
};

// Creating and exporting model
// To use our schema definition, we need to convert our Schema into a Model we can work with.
// To do so, we pass it into mongoose.model(modelName, schema):
const User = mongoose.model("User", userSchema);

// export the model from Mongoose schema using CommonJS syntax
module.exports = {
  User,
};
