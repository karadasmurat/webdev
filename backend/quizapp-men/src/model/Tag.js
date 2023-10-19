const mongoose = require("mongoose");
// const { Schema } = require('mongoose');

// new Schema({ /* ... */}, options);
// Note that Schemas have a few configurable options.

const sampleTag = {
  text: "New",
};

const schema = new mongoose.Schema(
  {
    text: {
      type: String,
      trim: true, // Trim whitespace from the beginning and end of the string
      required: true,
    },
  },

  // options
  // The timestamps option tells Mongoose to assign createdAt and updatedAt fields
  { timestamps: true }
);

// Creating and exporting model
const Tag = mongoose.model("Tag", schema);

// export the model from Mongoose schema using CommonJS syntax
module.exports = { Tag, sampleTag };

// we could also directly export the single schema: like export default, nameless.
// module.exports = mongoose.model("Workout", workoutSchema);


