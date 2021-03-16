import express, { Request, Response } from "express";
// controllers
import {
  createWorkout,
  addExercise,
  getAllWorkouts,
  getAllExercises,
} from "../controllers/workouts";
// middlewares
import { protect } from "../middlewares/authMiddleware";

// validators
import { createWorkoutValidator } from "../validators/workoutValidators";
import { runValidation } from "../validators";

// router init
const router = express.Router();
// create a new workout
router
  .route("/")
  .post(protect, createWorkoutValidator, runValidation, createWorkout)
  .get(protect, getAllWorkouts);
// add an exercise to a workout
router.route("/:id/exercise").put(protect, addExercise);
router.route("/exercises").get(protect, getAllExercises);

export default router;
