const mongoose = require("mongoose");
// const { Schema } = require('mongoose');

// new Schema({ /* ... */}, options);
// Note that Schemas have a few configurable options.

const sampleQuestion = {
  type: "selectOne",
  category: "Geography",
  difficulty: "easy",
  text: "What is the capital of France?",
  options: ["Paris", "London", "Istanbul", "Washington"],
};

const questionSchema = new mongoose.Schema(
  {
    type: String,
    category: String,
    difficulty: String,
    text: String,
    options: [String],
  },

  // options
  // The timestamps option tells Mongoose to assign createdAt and updatedAt fields
  { timestamps: true }
);

// Creating and exporting model
const Question = mongoose.model("Question", questionSchema);

// export the model from Mongoose schema using CommonJS syntax
module.exports = { Question, sampleQuestion };

// we could also directly export the single schema: like export default, nameless.
// module.exports = mongoose.model("Workout", workoutSchema);
