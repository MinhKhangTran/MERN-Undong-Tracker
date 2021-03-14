// global imports
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
// import model
import Exercise from "../models/Exercise";

// @desc    create a exercise
// @route   POST api/a1/exercises/
// @access  private
export const createNewExercise = asyncHandler(
  async (req: Request, res: Response) => {
    const exercise = await Exercise.findOne({ name: req.body.name });
    if (exercise) {
      res.status(400);
      throw new Error("Diese Übung gibt es schon");
    }
    const newExercise = await Exercise.create({
      name: req.body.name,
      user: req.user?.id,
      username: req.user?.username,
      category: req.body.category,
    });
    if (newExercise) {
      res.status(200).json(newExercise);
    } else {
      res.status(400);
      throw new Error("Es gab ein Fehler beim Erstellen einer Übung");
    }
  }
);
// @desc    get all exercises
// @route   GET api/a1/exercises/
// @access  private

// @desc    get a exercise by ID
// @route   GET api/a1/exercises/:id
// @access  private

// @desc    update an exercise
// @route   PUT api/a1/exercises/:id
// @access  private

// @desc    delete an exercise/:id
// @route   DELETE api/a1/exercises/:id
// @access  private
