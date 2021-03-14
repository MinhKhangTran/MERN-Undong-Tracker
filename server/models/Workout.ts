import mongoose, { Schema, Document } from "mongoose";

const workoutSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    username: {
      type: String,
      required: true,
    },
    exercises: [
      {
        exercise: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Exercise",
        },
        exerciseName: {
          type: String,
          required: true,
        },
        exerciseKategory: {
          type: String,
          required: true,
        },
        gewicht: {
          type: Number,
          default: 0,
        },
        sets: {
          type: Number,
          default: 0,
        },
        reps: [
          {
            satz: {
              type: Number,
              required: true,
            },
            wdh: {
              type: Number,
              required: true,
            },
          },
        ],
      },
    ],
  },
  { timestapms: true }
);

const Workout = mongoose.model("Workout", workoutSchema);
export default Workout;
