const WorkoutModel = require("../models/WorkoutModel");
const mongoose = require("mongoose");

// get all workouts
const getWorkouts = async (req, res) => {
  const user_id = req.user._id;
  try {
    const workouts = await WorkoutModel.find({ user_id }).sort({
      createdAt: -1,
    });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Workout doesent exists" });
  }
  try {
    const workout = await WorkoutModel.findById(id);
    return res.status(200).json(workout);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// create new workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  let emptyFields = [];
  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!reps) {
    emptyFields.push("reps");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  try {
    const user_id = req.user._id;
    const workout = await WorkoutModel.create({ title, load, reps, user_id });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Workout doesent exists" });
  }
  try {
    const deletedWorkout = await WorkoutModel.findByIdAndDelete({ _id: id });
    res.status(200).json(deletedWorkout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Workout doesent exists" });
  }
  try {
    const workout = await WorkoutModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          title: req.body.title,
          load: req.body.load,
          reps: req.body.reps,
        },
      }
    );
    return res.status(200).json(workout);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
