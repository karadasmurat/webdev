/**
 * Define a simple Car model.
 * Note that an instance of a model is called a document.
 */
const mongoose = require("mongoose");
const carSchema = new mongoose.Schema(
  {
    make: String,
    model: { type: String, minlength: 5 },
    year: { type: Number, min: 2000 }, // ValidatorError: Path `year` (1966) is less than minimum allowed value (2000).
  },
  // option: assign createdAt and updatedAt fields to your schema
  { timestamps: true }
);

// v1 - Add an instance method, which can be used by model instances.
// use the Schema.method() helper
carSchema.method("startEngine", function () {
  console.log("Starting engine.", this.make);
});

// v2 - use the Schema.methods object directly to save an instance method
carSchema.methods.getFullName = function () {
  return `${this.year} ${this.make}`;
};

// statics - define custom queries with static methods
// v2
carSchema.statics.findByYear = function (y) {
  return this.find({ year: y });
};

module.exports = mongoose.model("Car", carSchema);
