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
export const getAllExercises = asyncHandler(
  async (req: Request, res: Response) => {
    const exercises = await Exercise.find({}).sort({ createdAt: -1 });
    res.status(200).json(exercises);
  }
);
// @desc    get exercises by category
// @route   POST api/a1/exercises/category
// @access  private
export const getExerciseByCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const exercises = await Exercise.find({
      category: req.body.category,
    }).sort({ createdAt: -1 });
    res.status(200).json(exercises);
  }
);

// @desc    get a exercise by ID
// @route   GET api/a1/exercises/:id
// @access  private
export const getExerciseById = asyncHandler(
  async (req: Request, res: Response) => {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) {
      res.status(400);
      throw new Error("Diese Übung gibt es noch nicht!");
    }
    res.status(200).json(exercise);
  }
);

// @desc    update an exercise
// @route   PUT api/a1/exercises/:id
// @access  private
export const updateExercise = asyncHandler(
  async (req: Request, res: Response) => {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) {
      res.status(400);
      throw new Error("Diese Übung gibt es schon");
    }
    const newExercise = await Exercise.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        category: req.body.category,
      },
      { new: true }
    );
    if (newExercise) {
      res.status(200).json(newExercise);
    } else {
      res.status(400);
      throw new Error("Es gab ein Fehler beim Erstellen einer Übung");
    }
  }
);
// @desc    delete an exercise/:id
// @route   DELETE api/a1/exercises/:id
// @access  private
export const deleteExercise = asyncHandler(
  async (req: Request, res: Response) => {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) {
      res.status(400);
      throw new Error("Diese Übung gibt es schon");
    }
    await Exercise.findByIdAndDelete(req.params.id);

    res.status(200).json({ msg: "Übung wurde gelöscht!" });
  }
);
