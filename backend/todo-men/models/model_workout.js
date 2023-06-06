const mongoose = require("mongoose");
// const { Schema } = require('mongoose');

// new Schema({ /* ... */}, options);
// Note that Schemas have a few configurable options.

const workoutSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // ensure this path cannot be set to a nullish value
    },
    reps: {
      type: Number,
      required: true,
      min: 1,
    },
    load: {
      type: Number,
      required: true,
    },
  },

  // options
  // The timestamps option tells Mongoose to assign createdAt and updatedAt fields
  { timestamps: true }
);

// Creating and exporting model
// To use our schema definition, we need to convert our Schema into a Model we can work with.
// To do so, we pass it into mongoose.model(modelName, schema):
const Workout = mongoose.model("Workout", workoutSchema);

// export the model from Mongoose schema using CommonJS syntax
module.exports = {
  Workout,
};

// we could also directly export the single schema: like export default, nameless.
// module.exports = mongoose.model("Workout", workoutSchema);
