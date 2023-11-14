const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const argon2 = require("argon2");
const bcrypt = require("bcrypt");
const SALTROUNDS = 10;
const pwdUtils = require("../lib/auth-utils");

// const {Schema} = require('mongoose');

// With Mongoose, everything is derived from a Schema.
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: [true, "Not available."],
      required: [true, "Email required."],
    },
    password: String,

    username: String,
    googleId: String,
    displayName: String,
  },
  //
  { timestamps: true }
);

// passport-local-mangoose adds fields and methods related to authentication:
// salt, hash properties
// authenticate(), register(), serialize(), deserialize() methods
userSchema.plugin(passportLocalMongoose);

// customize property names
// LocalStrategy expects exactly "username" and "password" fields.
userSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
});

// Custom method to signup
// Create a new Model instance, and save.
userSchema.statics.signup = async function (email, password) {
  console.log("User.signup()");

  try {
    // hash the password, and store in db:
    const hashedPassword = await pwdUtils.hash(password);

    // create a model instance with the same email, but hashed password:
    const new_user = new this({
      email,
      password: hashedPassword,
    });

    await new_user.save();

    // Successfully signed up.
    // done(null, new_user);
  } catch (err) {
    console.log(err);
    // done(new Error("User not found."));
  }
};

// passport LocalStrategy verify business logic
userSchema.statics.signin = async function (email, password, done) {
  console.log("verify: User.signin()");

  try {
    const existing_user = await this.findOne({ email });

    if (!existing_user) {
      // verify function calls the callback with false to indicate an authentication failure
      return done(null, false); // 401
      // return done(new Error("User not found."));
    }

    // verify password: compare plain password with hash from db.
    const pass_match = await pwdUtils.verify(existing_user.password, password);

    if (!pass_match) {
      console.log("Invalid password.");
      // verify function calls the callback with false to indicate an authentication failure
      return done(null, false); // 401
      // return done(new Error("Unauthorized."));
    }

    return done(null, existing_user);
  } catch (err) {
    // If an error occurs, such as the database not being available, the callback is called with an error:
    return done(err);
  }
};

userSchema.statics.findOrCreate = async function findOrCreate(profile, done) {
  console.log("User.findOrCreate()");
  // console.log(profile);

  try {
    // Find or create the user in the database
    const existingUser = await this.findOne({
      googleId: profile.id, // search using googleId field
    }).exec();

    if (!existingUser) {
      // Create a new user
      console.log("Creating user with Google credentials.");
      const newUser = new this({
        username: profile.email,
        googleId: profile.id,
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
    // callback is provided with the error
    done(error);
  }
};

// Creating and exporting model
// To use our schema definition, we need to convert our Schema into a Model we can work with.
// To do so, we pass it into mongoose.model(modelName, schema):

module.exports = mongoose.model("PassportUser", userSchema);

// const PassportUser = mongoose.model("PassportUser", userSchema);
// module.exports = {
//   PassportUser,
// };
