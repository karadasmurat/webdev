const mongoose = require("mongoose"); // CommonJS
// import mongoose from "mongoose"; // ES6 Modules
const { hash, verify } = require("../lib/auth-utils"); // CommonJS
const { AuthError } = require("../lib/Error");
// import { hash, verify } from "../lib/auth-utils"; // ES6 Modules

// const {Schema} = require('mongoose');

// With Mongoose, everything is derived from a Schema.
// check this ?
// Note that here in this schema we did not add any field for password unlike we do normally.
//This is because passport-local-mongoose doesn’t need it.
const userSchema = new mongoose.Schema(
  {
    // username: {
    //   type: String,
    //   unique: [true, "Username is not available."],
    //   required: [true, "Username required."],
    // },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Email is required."],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Password is required."],
    },
    // googleId: String,
    // displayName: String,
  },
  // The timestamps option assigns createdAt and updatedAt fields
  { timestamps: true }
);

// pre save middleware function: check unique email
// intercept and modify the behavior of specific document methods
userSchema.pre("save", async function (next) {
  console.log("userSchema.pre('save')");
  try {
    const existingUser = await User.findOne({ email: this.email });
    if (existingUser) {
      // throw new Error();
      return next(new AuthError(`${this.email} already taken!`));
      // return;
    }
    // If no user is found, move on to the next middleware
    next();
    // If no user is found, move on to the next middleware
  } catch (error) {
    // Pass error to next midddleware
    next(error);
  }
});

// Add a static function to User model:  signup
// hash the plaintext password, and store in db:
userSchema.statics.signup = async function (email, password_plaintext) {
  let password_hash;
  try {
    password_hash = await hash(password_plaintext);
  } catch (error) {
    console.log(error);
    // note that this is not a middleware, we can throw the error
    // next(error);
    throw error;
  }

  // return an existing model method
  return User.create({
    email,
    password: password_hash,
  });
};

// userSchema.statics.signup = async function (email, password_plaintext) {

//   let user = undefined;
//   try {
//     const hashedPassword = await hash(password_plaintext);

//     // create a model instance with the same email, but hashed password:
//     // notice there is a .pre('save) middleware
//     user = await User.create({
//       email,
//       password: hashedPassword,
//     });

//     // Successfully signed up.
//     console.log("User created.");
//     // done(null, new_user);
//   } catch (error) {
//     console.log("userSchema.statics.signup:", error);

//     // note that this is not a middleware, we can throw the error
//     // next(error);
//     throw error;
//   }

//   return user;
// };

// Creating and exporting model
// To use our schema definition, we need to convert our Schema into a Model we can work with.
// To do so, we pass it into mongoose.model(modelName, schema):
const User = mongoose.model("User", userSchema);

// export the model from Mongoose schema using CommonJS syntax
module.exports = {
  User,
};
