const mongoose = require("mongoose");
// const passportLocalMongoose = require("passport-local-mongoose");

// const {Schema} = require('mongoose');

// With Mongoose, everything is derived from a Schema.
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: [true, "Not available."],
    required: [true, "Email required."],
  },
  password: String,

  username: String,
  googleId: String,
  displayName: String,
});

// passport-local-mangoose adds fields and methods related to authentication:
// salt, hash properties
// authenticate(), register(), serialize(), deserialize() methods
// userSchema.plugin(passportLocalMongoose);

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

module.exports = mongoose.model("User", userSchema);

// const User = mongoose.model("User", userSchema);
// module.exports = {
//   User,
// };
