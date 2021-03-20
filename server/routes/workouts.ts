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
  getExerciseById,
  deleteExercise,
  updateExercise,
  // Set controller
  addSet,
  deleteSet,
  updateSet,
  getSingleSet,
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
router
  .route("/:workoutId/exercise/:exerciseId")
  .get(protect, getExerciseById)
  .delete(protect, deleteExercise)
  .put(protect, updateExercise);
// Set

// add set to an exercise
router.route("/:workoutID/exercise/:id/set").put(protect, addSet);
// delete a set and get set by id and update a set
router
  .route("/:workoutId/exercise/:exerciseId/set/:setId")
  .delete(protect, deleteSet)
  .get(protect, getSingleSet)
  .put(protect, updateSet);

export default router;
