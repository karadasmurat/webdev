// You can think of a router as a “mini-application,” capable only of performing middleware and routing functions.
// The top-level express object has a Router() method that creates a new router object.
// Once you’ve created a router object, you can add middleware and HTTP method routes
// (such as get, put, post, and so on) to it just like an application

const express = require("express");
const router = express.Router();

// import controller
const {
  getAllItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} = require("../controller/controller_Question");

router.get("/", getAllItems);

router.get("/:id", getItem);

router.post("/", createItem);

router.patch("/:id", updateItem);

router.delete("/:id", deleteItem);

module.exports = router;
