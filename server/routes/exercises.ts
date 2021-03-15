import express, { Request, Response } from "express";
// controllers
import {
  createNewExercise,
  getAllExercises,
  getExerciseById,
  updateExercise,
  deleteExercise,
  getExerciseByCategory,
} from "../controllers/exercises";
// middlewares
import { protect } from "../middlewares/authMiddleware";

// validators
import {
  createExValidator,
  filterCategoryValidator,
} from "../validators/exerciseValidators";
import { runValidation } from "../validators";

// router init
const router = express.Router();
// create a new exercise,get all Exercises
router
  .route("/")
  .post(protect, createExValidator, runValidation, createNewExercise)
  .get(getAllExercises);

// get, update and delete an exercise by ID
router
  .route("/:id")
  .get(protect, getExerciseById)
  .put(protect, createExValidator, runValidation, updateExercise)
  .delete(protect, deleteExercise);
// Get exercises by category
router
  .route("/category")
  .post(protect, filterCategoryValidator, runValidation, getExerciseByCategory);

export default router;
