import express from "express";
const router = express.Router();

import {
  createWorkout,
  deleteWorkout,
  getAllData,
  getSingleData,
  updateWorkout,
} from "../controllers/workoutController.js";
import authenticateUser from "../auth/authenticateUser.js";

// ? Setting up the middleware :::
router.use(authenticateUser);

router.get("/", getAllData);
router.get("/:Id", getSingleData);
router.post("/create", createWorkout);
router.patch("/:Id", updateWorkout);
router.delete("/:Id", deleteWorkout);

export default router;
