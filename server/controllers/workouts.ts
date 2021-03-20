// global imports
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
// import model
import Workout from "../models/Workout";
import Exercise from "../models/Exercise";

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
export const getAllWorkouts = asyncHandler(
  async (req: Request, res: Response) => {
    const workouts = await Workout.find({ user: req.user?.id }).sort({
      createdAt: -1,
    });
    if (workouts) {
      res.status(200).json(workouts);
    } else {
      res.status(400);
      throw new Error("Es gab ein Fehler beim Fetchen der Einheiten");
    }
  }
);

// @desc    get a workout by ID
// @route   GET api/a1/workouts/:id
// @access  private
export const getWorkoutById = asyncHandler(
  async (req: Request, res: Response) => {
    const workout = await Workout.findById(req.params.id);
    if (workout) {
      res.status(200).json(workout);
    } else {
      res.status(400);
      throw new Error("Es gab ein Fehler beim Fetchen der Einheit");
    }
  }
);

// @desc    update an workout
// @route   PUT api/a1/workouts/:id
// @access  private
export const updateWorkout = asyncHandler(
  async (req: Request, res: Response) => {
    const workout = await Workout.findById(req.params.id);
    if (workout) {
      const newWorkout = await Workout.findByIdAndUpdate(
        req.params.id,
        { $set: { name: req.body.name } },
        { new: true }
      );
      res.status(200).json(newWorkout);
    } else {
      res.status(400);
      throw new Error("Es gab ein Fehler beim Updaten der Einheit");
    }
  }
);

// @desc    delete an workout by id
// @route   DELETE api/a1/workouts/:id
// @access  private
export const deleteWorkout = asyncHandler(
  async (req: Request, res: Response) => {
    const workout = await Workout.findById(req.params.id);
    if (workout) {
      await workout.remove();
      res.status(200).json({ msg: "Einheit wurde gelöscht! 🥲" });
    } else {
      res.status(400);
      throw new Error("Es gab ein Fehler beim Löschen der Einheit");
    }
  }
);

// ===================================================================
// ==========================Exercise=================================
// ===================================================================

// @desc    add an Exercise
// @route   put api/a1/workouts/:id/exercise
// @access  private
export const addExercise = asyncHandler(async (req: Request, res: Response) => {
  const workout = await Workout.findById(req.params.id);

  workout?.exercises.push(req.body);

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
export const getAllExercises = asyncHandler(
  async (req: Request, res: Response) => {
    const exercises = await Exercise.find({}).sort({ createdAt: -1 });
    if (exercises) {
      res.status(200).json(exercises);
    } else {
      res.status(400);
      throw new Error("Es gab ein Fehler beim Fetchen der Übungen");
    }
  }
);

// @desc    get a exercise by ID
// @route   GET api/a1/workouts/:workoutId/exercise/:exerciseId
// @access  private
export const getExerciseById = asyncHandler(
  async (req: Request, res: Response) => {
    const exercise = await Workout.findOne({
      _id: req.params.workoutId,
      "exercises._id": req.params.exerciseId,
    });
    if (exercise) {
      res.status(200).json(exercise);
    } else {
      res.status(400);
      throw new Error("Es gab ein Fehler beim Fetchen der Übung");
    }
  }
);

// @desc    update an exercise
// @route   PUT api/a1/workouts/exercise/:id
// @access  private

// @desc    delete an exercise by id
// @route   DELETE api/a1/workouts/:workoutId/exercise/:exerciseId
// @access  private
export const deleteExercise = asyncHandler(
  async (req: Request, res: Response) => {
    const exercise = await Workout.updateOne(
      { _id: req.params.workoutId },
      { $pull: { exercises: { _id: req.params.exerciseId } } }
    );
    console.log(exercise);
    if (exercise) {
      res.status(200).json(exercise);
    } else {
      res.status(400);
      throw new Error("Es gab ein Fehler beim Löschen der Übung");
    }
  }
);

// ===================================================================
// ==========================Set======================================
// ===================================================================

// @desc    add a Set
// @route   PUT api/a1/workouts/:workoutID/exercise/:id/set
// @access  private
export const addSet = asyncHandler(async (req: Request, res: Response) => {
  const workout = await Workout.findById(req.params.workoutID);
  // search for specific exercise
  // console.log(workout?.exercises);
  const specificWorkout = workout?.exercises.find((exercise) => {
    // console.log(typeof exercise._id, typeof req.params.id);
    return exercise._id.toString() === req.params.id.toString();
  });
  // console.log(specificWorkout);

  if (!specificWorkout) {
    res.status(400);
    throw new Error("Diese Übung gibt es nicht");
  }

  specificWorkout.sätze.push(req.body);
  await workout?.save();
  if (workout) {
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
// @route   GET api/a1/workouts/:workoutId/exercise/:exerciseId/set/:setId
// @access  private
export const getSingleSet = asyncHandler(
  async (req: Request, res: Response) => {
    const set = await Workout.findOne({
      _id: req.params.workoutId,
      "exercises._id": req.params.exerciseId,
      "exercises.sätze._id": req.params.setId,
    });

    if (set) {
      // console.log(set);
      res.status(200).json(set);
    } else {
      res.status(400);
      throw new Error("Es gab ein Fehler beim Fetchen des Satzes");
    }
  }
);

// @desc    update a set
// @route   PUT api/a1/workouts/:workoutId/exercise/:exerciseId/set/:setId
// @access  private
export const updateSet = asyncHandler(async (req: Request, res: Response) => {
  const updatedSet = await Workout.updateOne(
    {
      _id: req.params.workoutId,
    },
    {
      $set: {
        "exercises.$[].sätze.$[elem].gewicht": req.body.gewicht,
        "exercises.$[].sätze.$[elem].wdh": req.body.wdh,
      },
    },
    {
      arrayFilters: [
        {
          "elem._id": req.params.setId,
        },
      ],
    }
  );
  console.log(updateSet);
  if (updatedSet) {
    res.status(200).json({ msg: "Satz wurde geändert" });
  } else {
    res.status(400);
    throw new Error("Es gab ein Fehler beim Ändern des Satzes");
  }
});
// @desc    delete an set by id
// @route   DELETE api/a1/workouts/:workoutId/exercise/:exerciseId/set/:setId
// @access  private
export const deleteSet = asyncHandler(async (req: Request, res: Response) => {
  const removedWorkout = await Workout.findOneAndUpdate(
    { _id: req.params.workoutId, "exercises._id": req.params.exerciseId },
    // @ts-expect-error
    { $pull: { "exercises.$.sätze": { _id: req.params.setId } } }
  );
  if (removedWorkout) {
    res.status(200).json({ msg: "Satz wurde gelöscht" });
  } else {
    res.status(400);
    throw new Error("Es gab ein Fehler beim Löschen des Satzes");
  }
});
