// You can think of a router as a “mini-application,” capable only of performing middleware and routing functions.
// The top-level express object has a Router() method that creates a new router object.
// Once you’ve created a router object, you can add middleware and HTTP method routes
// (such as get, put, post, and so on) to it just like an application

const express = require("express");
const router = express.Router();

// import mongoose Model
const { Todo } = require("../models/model_todo");

// import controller
const {
  getAllTodos,
  getTodoById,
  createTodo,
  patchTodoById,
  putTodoById,
  deleteById,
} = require("../controllers/controller_todo");

// look for user on session
function requireAuth(req, res, next) {
  console.log("verify authentication");
  if (!req.session.email) {
    res.status(401).json({ error: "Authorization required." });
  }

  next();
}

router.get("/", requireAuth, getAllTodos);

router.get("/:id", getTodoById);

router.post("/", createTodo);

router.patch("/:id", patchTodoById);
router.put("/:id", putTodoById);

router.delete("/:id", deleteById);

module.exports = router;
