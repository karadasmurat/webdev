// import mongoose models
const { Question } = require("../model/Question");

// get all items
// GET /items
const getAllItems = async (req, res, next) => {
  // res.json({ msg: "Get all items" });

  // maximum number of documents the query will return
  const { numberOfQuestions, level } = req.query;
  // console.log("Filter difficulty:", level);
  // console.log("Filter limit:", numberOfQuestions);

  // let filter = req.query;
  let filter = { difficulty: level };
  console.log("Filter:", filter);

  try {
    // Note that Model.find() returns an empty array when no documents match the query!
    let query = Question.find(filter);
    if (numberOfQuestions) {
      console.log("Limit query:", numberOfQuestions);
      query = query.limit(numberOfQuestions);
    }
    query = query.sort({
      createdAt: "desc",
    });

    const questions = await query.exec();
    // console.log(questions);

    res.status(200).send(questions);
  } catch (err) {
    next(err);
  }
};

// get a single Item
// GET /items/:id
const getItem = async (req, res) => {
  // parse URL path  - req.params object contains the route parameter
  const { id } = req.params;

  res.json({ msg: "GET the Item: " + id });
};

// create an Item
// POST /items/
const createItem = async (req, res, next) => {
  // res.json({ msg: "POST a new item" });
  // Get properties from the request.body object. (object destructuring)
  console.log(req.body);
  const { type, category, difficulty, text, options } = req.body;

  try {
    // object property shorthand: { title, reps, load }
    const item = new Question({ type, category, difficulty, text, options });
    await item.save();

    throw new Error("Lets see what happens");

    res.status(200).send(item);
  } catch (err) {
    console.error(err);

    // v1. pass the error to the next error-handling middleware in the chain
    // It allows you to centralize error handling logic in dedicated error-handling middleware functions, making your code more organized and maintainable.
    next(err);

    // v2. immediately respond to the client with an error
    // res.status(500).json({ error: err.message });
  }
};

// update an Item
// PUT PATCH /items/:id
const updateItem = async (req, res) => {
  // Get id from path  - req.params object contains the route parameter
  const { id } = req.params;

  res.json({ msg: "Update an Item: " + id });

  // Get properties from the request.body object. (object destructuring)
  // const { title, reps, load } = req.body;
};

// delete an Item
// DELETE /items/:id
const deleteItem = async (req, res) => {
  // URL path  - req.params object contains the route parameter
  const { id } = req.params;

  res.json({ msg: "Delete an Item: " + id });
};

// export functions
module.exports = {
  getAllItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
};
