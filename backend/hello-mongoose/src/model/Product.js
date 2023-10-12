/**
 * Define a Product model.
 * Note that an instance of a model is called a document.
 */
const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    brand: String,
    categories: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Category", // ref: FK
      },
    ],
  },
  // option: assign createdAt and updatedAt fields to your schema
  { timestamps: true }
);

const categorySchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    parentCategory: {
      type: mongoose.Types.ObjectId,
      ref: "Category", // self ref: FK
    },
  },
  // option: assign createdAt and updatedAt fields to your schema
  { timestamps: true }
);

// Creating a model
const Product = mongoose.model("Product", productSchema);
const Category = mongoose.model("Category", categorySchema);

// export the model from Mongoose schema using CommonJS syntax
module.exports = {
  Product,
  Category,
};
