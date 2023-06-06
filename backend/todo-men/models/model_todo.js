const mongoose = require("mongoose");
// const { Schema } = require('mongoose');

// new Schema({ /* ... */}, options);
// Note that Schemas have a few configurable options.

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // ensure this path cannot be set to a nullish value
    },
    priority: String,
    status: String,
    due: Date,
  },

  // options
  // The timestamps option tells Mongoose to assign createdAt and updatedAt fields
  { timestamps: true }
);

// Creating and exporting model
// To use our schema definition, we need to convert our Schema into a Model we can work with.
// To do so, we pass it into mongoose.model(modelName, schema):
const Todo = mongoose.model("Todo", todoSchema);

// export the model from Mongoose schema using CommonJS syntax
module.exports = {
  Todo,
};

// we could also directly export the single schema: like export default, nameless.
// module.exports = mongoose.model("Workout", workoutSchema);
