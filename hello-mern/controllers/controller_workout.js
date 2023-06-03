// functions to be used with related router.

// we will check ObjectId - if any error caught is instance of mongoose.CastError
const mongoose = require("mongoose");

const { Workout } = require("../models/model_workout");

// get all workouts
const getWorkouts = async (req, res) => {
  // res.json({ msg: "POST a new workouts" });

  try {
    const workouts = await Workout.find({}).sort({ createdAt: -1 });

    res.status(200).send(workouts);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

// get a single workout
// /workouts/:id
const getWorkout = async (req, res) => {
  // parse URL path  - req.params object contains the route parameter
  const { id } = req.params;

  //check if id is valid bson ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    // Invalid ObjectId
    // return res.status(400).json({ error: "Invalid argument." });
    return res.sendStatus(404);
  }

  try {
    const workout = await Workout.findOne({ _id: id });

    if (!workout) {
      res.sendStatus(404);
    } else {
      res.status(200).send(workout);
    }
  } catch (err) {
    console.log(err);
    if (err instanceof mongoose.CastError) {
      // Invalid ObjectId
      // !mongoose.Types.ObjectId.isValid(id)
      return res.status(400).json({ error: "Invalid argument." });
    }

    // Handle other unexpected errors
    res.status(500).json({ error: "Server error" });
  }
};

// create a workout
const createWorkout = async (req, res) => {
  // res.json({ msg: "POST a new workouts" });
  // Get properties from the request.body object. (object destructuring)
  const { title, reps, load } = req.body;

  try {
    // object property shorthand: { title, reps, load }
    const workout = new Workout({ title, reps, load });
    await workout.save();

    res.status(200).send(workout);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

// update a workout
const updateWorkout = async (req, res) => {
  // Get id from path  - req.params object contains the route parameter
  const { id } = req.params;

  // Get properties from the request.body object. (object destructuring)
  const { title, reps, load } = req.body;

  //check if id is valid bson ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    // Invalid ObjectId
    // return res.status(400).json({ error: "Invalid argument." });
    return res.sendStatus(404);
  }

  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: id },
      { title, reps, load } // new object from req.body . compare this with {...req.body}
    );

    if (!workout) {
      res.status(404).json({ error: "Not found: " + id });
      //   res.sendStatus(404);
    } else {
      res.status(200).send(workout);
    }
  } catch (err) {
    console.log(err);
    // res.status(500).json({ error: "Server error" });
    res.sendStatus(500);
  }
};

// delete a workout
const deleteWorkout = async (req, res) => {
  // parse URL path  - req.params object contains the route parameter
  const { id } = req.params;

  //check if id is valid bson ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    // Invalid ObjectId
    // return res.status(400).json({ error: "Invalid argument." });
    return res.sendStatus(404);
  }

  try {
    const workout = await Workout.findOneAndDelete({ _id: id });
    //const workout = await Workout.findByIdAndDelete(id);

    if (!workout) {
      res.sendStatus(404);
    } else {
      res.status(200).send(workout);
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
  getWorkouts,
  getWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout,
};
