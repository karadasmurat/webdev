/**
 * Define a simple Car model.
 * Note that an instance of a model is called a document.
 */
const mongoose = require("mongoose");
const carSchema = new mongoose.Schema(
  {
    make: String,
    model: String,
    year: Number,
  },
  // option: assign createdAt and updatedAt fields to your schema
  { timestamps: true }
);

module.exports = mongoose.model("Car", carSchema);
