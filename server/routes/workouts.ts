import express, { Request, Response } from "express";
// controllers
import {
  // Workout controller
  createWorkout,
  getAllWorkouts,
  getWorkoutById,
  updateWorkout,
  deleteWorkout,
  // Exercise controller
  addExercise,
  getAllExercises,
  // Set controller
  addSet,
} from "../controllers/workouts";
// middlewares
import { protect } from "../middlewares/authMiddleware";

// validators
import { createWorkoutValidator } from "../validators/workoutValidators";
import { runValidation } from "../validators";

// router init
const router = express.Router();
// Workout
// create a new workout
router
  .route("/")
  .post(protect, createWorkoutValidator, runValidation, createWorkout)
  .get(protect, getAllWorkouts);
router
  .route("/:id")
  .get(protect, getWorkoutById)
  .put(protect, createWorkoutValidator, runValidation, updateWorkout)
  .delete(protect, deleteWorkout);

// Exercise
// add an exercise to a workout
router.route("/:id/exercise").put(protect, addExercise);
router.route("/exercises").get(protect, getAllExercises);
// Set
// add set to an exercise
router.route("/:workoutID/exercise/:id/set").put(protect, addSet);

export default router;
