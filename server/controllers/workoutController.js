import mernStack from "../models/workoutModels.js";

// ? Get All Workout Data:::
export const getAllData = async (req, res, next) => {
  try {
    const allData = await mernStack.find().sort({ createdAt: -1 });
    res.status(200).json(allData);
    next();
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ? Get Single Workout Data:::
export const getSingleData = async (req, res, next) => {
  const { Id } = req.params;
  try {
    const singleData = await mernStack.findOne({ _id: Id });
    res.status(200).json({ data: singleData });
    next();
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

// ? Creating Workout Data:::
export const createWorkout = async (req, res, next) => {
  const data = req.body;
  const { title, reps, load } = req.body;
  const newWorkout = new mernStack(data);

  // ! Setting up the Custom Error Message :::
  let emptyFields = [];
  if (!title) {
    emptyFields.push("title");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (!load) {
    emptyFields.push("load");
  }
  /*   if (!emptyFields.length > 0) {
    return res.status(404).json({ error: "Please fill in all the fields" });
  } */

  try {
    await newWorkout.save();
    res.status(200).json(newWorkout);
    next();
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

// ? Get Single Workout Data:::
export const updateWorkout = async (req, res, next) => {
  const data = req.body;
  const { Id } = req.params;
  try {
    const updateOne = await mernStack.findOneAndUpdate({ _id: Id }, data, {
      runValidators: true,
      new: true,
    });
    res.status(200).json(updateOne);
    next();
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

// ? Delete Single Workout Data:::
export const deleteWorkout = async (req, res, next) => {
  const { Id } = req.params;
  try {
    const deleteOne = await mernStack.findOneAndDelete({ _id: Id });
    res.status(200).json(deleteOne);
    next();
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};
