import express, { Request, Response } from "express";
// controllers
import { createWorkout, addExercise } from "../controllers/workouts";
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
  .post(protect, createWorkoutValidator, runValidation, createWorkout);
// add an exercise to a workout
router.route("/:id/exercise").post(protect, addExercise);

export default router;
