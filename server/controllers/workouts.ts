// global imports
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
// import model
import Workout from "../models/Workout";

// @desc    create a Workout
// @route   POST api/a1/workouts/
// @access  private
export const createWorkout = asyncHandler(
  async (req: Request, res: Response) => {
    const workout = await Workout.create({
      name: req.body.name,
      user: req.user?.id,
      username: req.user?.username,
    });
    if (workout) {
      res.status(200).json(workout);
    } else {
      res.status(400);
      throw new Error("Es gab ein Fehler beim Erstellen einer Einheit");
    }
  }
);

// @desc    get all Workouts
// @route   GET api/a1/workouts/
// @access  private

// @desc    get a workout by ID
// @route   GET api/a1/workouts/:id
// @access  private

// @desc    update an workout
// @route   PUT api/a1/workouts/:id
// @access  private

// @desc    delete an workout by id
// @route   DELETE api/a1/workouts/:id
// @access  private

// ===================================================================
// ==========================Exercise=================================
// ===================================================================

// @desc    add an Exercise
// @route   POST api/a1/workouts/:id/exercise
// @access  private
export const addExercise = asyncHandler(async (req: Request, res: Response) => {
  const workout = await Workout.findById(req.params.id);
  const newExercise = req.body.exercises;

  workout?.exercises.push(newExercise);
  await workout?.save();
  if (workout) {
    res.status(200).json(workout);
  } else {
    res.status(400);
    throw new Error("Es gab ein Fehler beim Erstellen einer Übung");
  }
});

// @desc    get all exercises
// @route   GET api/a1/workouts/exercise
// @access  private

// @desc    get a exercise by ID
// @route   GET api/a1/workouts/exercise/:id
// @access  private

// @desc    update an exercise
// @route   PUT api/a1/workouts/exercise/:id
// @access  private

// @desc    delete an exercise by id
// @route   DELETE api/a1/workouts/exercise/:id
// @access  private

// ===================================================================
// ==========================Set======================================
// ===================================================================

// @desc    add a Set
// @route   POST api/a1/workouts/:workoutID/exercise/:id/set
// @access  private
export const addSet = asyncHandler(async (req: Request, res: Response) => {
  const workout = await Workout.findById(req.params.workoutID);
  // search for specific exercise
  const specificWorkout = workout?.exercises.find(
    (exercise) => exercise._id === req.params.id
  );
  if (!specificWorkout) {
    res.status(400);
    throw new Error("Diese Übung gibt es nicht");
  }
  const newSet = {
    gewicht: req.body.gewicht,
    wdh: req.body.wdh,
  };
  specificWorkout.sätze.push(newSet);
  await workout?.save();
  if (newSet) {
    res.status(200).json(workout);
  } else {
    res.status(400);
    throw new Error("Es gab ein Fehler beim Erstellen der Sätze");
  }
});

// @desc    get all sets
// @route   GET api/a1/workouts/exercise/set
// @access  private

// @desc    get a set by ID
// @route   GET api/a1/workouts/exercise/set/:id
// @access  private

// @desc    update a set
// @route   PUT api/a1/workouts/exercise/set/:id
// @access  private

// @desc    delete an set by id
// @route   DELETE api/a1/workouts/exercise/set/:id
// @access  private
