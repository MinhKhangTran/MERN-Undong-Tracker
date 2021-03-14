import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./User";

export interface IExercise extends Document {
  user: IUser;
  name: string;
  category:
    | "Brust"
    | "Arme"
    | "Schulter"
    | "Beine"
    | "Bauch"
    | "Rücken"
    | "Unterer Rücken";
  sets: number;
  reps: any[];
}

const exerciseSchema: Schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    username: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      enum: [
        "Brust",
        "Arme",
        "Schulter",
        "Beine",
        "Bauch",
        "Rücken",
        "Unterer Rücken",
      ],
      required: true,
    },
  },
  { timestamps: true }
);

const Exercise = mongoose.model<IExercise>("Exercise", exerciseSchema);
export default Exercise;
