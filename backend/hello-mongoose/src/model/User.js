const mongoose = require("mongoose");

// Define a Mongoose schema for a user
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // This creates a unique index on the 'username' field
  },
  age: Number,
});

// Define a secondary index on the 'age' field
userSchema.index({ age: 1 });

// Create a model for the 'User' collection
const User = mongoose.model("User", userSchema);

module.exports = User;
