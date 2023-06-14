// functions to be used with related router.

// we will check ObjectId - if any error caught is instance of mongoose.CastError
const mongoose = require("mongoose");

const { Todo } = require("../models/model_todo");

// get all items
const getAllTodos = async (req, res) => {
  // res.json({ msg: "POST a new workouts" });

  try {
    const todos = await Todo.find({}).sort({ createdAt: -1 });
    console.log(todos);

    res.status(200).send(todos);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

// get a single item
// /:id
const getTodoById = async (req, res) => {
  // parse URL path  - req.params object contains the route parameter
  const { id } = req.params;

  //check if id is valid bson ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    // Invalid ObjectId
    // return res.status(400).json({ error: "Invalid argument." });
    return res.sendStatus(404);
  }

  try {
    const item = await Todo.findOne({ _id: id });

    if (!item) {
      res.sendStatus(404);
    } else {
      res.status(200).send(item);
    }
  } catch (err) {
    console.log(err);
    // if (err instanceof mongoose.CastError) {
    //   // Invalid ObjectId
    //   // !mongoose.Types.ObjectId.isValid(id)
    //   return res.status(400).json({ error: "Invalid argument." });
    // }

    // Handle other unexpected errors
    res.status(500).json({ error: "Server error" });
  }
};

// create an item
const createTodo = async (req, res) => {
  // res.json({ msg: "POST a new item" });
  // Get properties from the request.body object. (object destructuring)
  const { title, priority, status, due } = req.body;

  try {
    // object property shorthand: { title, reps, load }
    const item = new Todo({ title, priority, status, due });
    await item.save();

    res.status(200).send(item);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

// update a workout
const patchTodoById = async (req, res) => {
  // Get id from path  - req.params object contains the route parameter
  const { id } = req.params;

  // Get properties from the request.body object. (object destructuring)
  const { title, completed, due, status, priority } = req.body;
  // console.log({ title, completed, due, status, priority });

  //check if id is valid bson ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    // Invalid ObjectId
    // return res.status(400).json({ error: "Invalid argument." });
    return res.sendStatus(404);
  }

  try {
    const item = await Todo.findOneAndUpdate(
      { _id: id },
      { title, completed, due, status, priority } // new object from req.body . compare this with {...req.body}
    );

    if (!item) {
      // res.status(404).json({ error: "Not found: " + id });
      res.sendStatus(404);
    } else {
      res.status(200).send(item);
    }
  } catch (err) {
    console.log(err);
    // res.status(500).json({ error: "Server error" });
    res.sendStatus(500);
  }
};

// update a workout
const putTodoById = async (req, res) => {
  // Get id from path  - req.params object contains the route parameter
  const { id } = req.params;

  // Get properties from the request.body object. (object destructuring)
  // const { title, completed, due, status, priority } = req.body;
  // console.log({ title, completed, due, status, priority });

  //check if id is valid bson ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    // Invalid ObjectId
    // return res.status(400).json({ error: "Invalid argument." });
    return res.sendStatus(404);
  }

  try {
    const item = await Todo.findOneAndUpdate(
      { _id: id },
      { ...req.body } // new object from req.body . compare this with {...req.body}
    );

    if (!item) {
      // res.status(404).json({ error: "Not found: " + id });
      res.sendStatus(404);
    } else {
      res.status(200).send(item);
    }
  } catch (err) {
    console.log(err);
    // res.status(500).json({ error: "Server error" });
    res.sendStatus(500);
  }
};

// delete an item
// DELETE /:id
const deleteById = async (req, res) => {
  // parse URL path  - req.params object contains the route parameter
  const { id } = req.params;

  //check if id is valid bson ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    // Invalid ObjectId
    // return res.status(400).json({ error: "Invalid argument." });
    return res.sendStatus(404);
  }

  try {
    const item = await Todo.findOneAndDelete({ _id: id });
    //const workout = await Workout.findByIdAndDelete(id);

    if (!item) {
      res.sendStatus(404);
    } else {
      res.status(200).send(item);
    }
  } catch (err) {
    console.log(err);
    // if (err instanceof mongoose.CastError) {
    //   // Invalid ObjectId
    //   return res.status(400).json({ error: "Invalid argument." });
    // }

    // Handle other unexpected errors
    // res.status(500).json({ error: "Server error" });
    res.sendStatus(500);
  }
};

// export functions
module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  patchTodoById,
  putTodoById,
  deleteById,
};
