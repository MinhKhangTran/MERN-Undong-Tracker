import mongoose, { Schema, Document } from "mongoose";
import { IExercise } from "./Exercise";
import { IUser } from "./User";

export interface IWorkout extends Document {
  name: string;
  user: IUser;
  username: string;
  exercises: [
    {
      exercise: IExercise;
      exerciseName: string;
      exerciseKategory:
        | "Brust"
        | "Arme"
        | "Schulter"
        | "Beine"
        | "Bauch"
        | "Rücken"
        | "Unterer Rücken";
      sätze: [
        {
          gewicht: number;
          wdh: number;
        }
      ];
    }
  ];
}

const workoutSchema: Schema = new mongoose.Schema(
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
        sätze: [
          {
            gewicht: {
              type: Number,
              default: 0,
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
  { timestamps: true }
);

const Workout = mongoose.model<IWorkout>("Workout", workoutSchema);
export default Workout;
