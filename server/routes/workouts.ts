import express, { Request, Response } from "express";
// controllers
// import { createNewExercise } from "../controllers/exercises";
// middlewares
import { protect } from "../middlewares/authMiddleware";

// validators
import {
  createExValidator,
  //   loginValidator,
} from "../validators/exerciseValidators";
import { runValidation } from "../validators";

// router init
const route = express.Router();
// create a new exercise

export default route;
