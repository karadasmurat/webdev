const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const bcrypt = require("bcrypt");
const SALTROUNDS = 10;

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
userSchema.plugin(passportLocalMongoose);

// customize property names
// LocalStrategy expects exactly "username" and "password" fields.
userSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
});

// Custom method to signup
userSchema.statics.signup = async function (email, password) {
  console.log("User.signup()");

  try {
    // hash the password, and store in db:
    const salt = await bcrypt.genSalt(SALTROUNDS);
    const hash = await bcrypt.hash(password, salt);

    // create a model instance with the same email, but hashed password:
    const new_user = new this({
      email,
      password: hash,
    });

    await new_user.save();

    // Successfully signed up.
    // done(null, new_user);
  } catch (err) {
    console.log(err);
    // done(new Error("User not found."));
  }
};

// testing custom method to signin
userSchema.statics.signin = async function (email, password, done) {
  console.log("User.signin()");

  const existing_user = await this.findOne({ email });

  if (!existing_user) {
    console.log("user not found");
    // return res.status(401).json({ message: "Unauthorized" });

    done(new Error("User not found."));
  }

  // verify password: compare plain password with hash from db.
  const pass_match = await bcrypt.compare(password, existing_user.password);
  if (!pass_match) {
    console.log("Invalid password.");
    // return res.status(401).json({ message: "Unauthorized" });

    done(new Error("Unauthorized."));
  }

  // Successfully signed in.
  done(null, existing_user);
};

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
