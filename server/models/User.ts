import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

// types
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

const userSchema: Schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username ist nötig"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email ist nötig"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Passwort ist nötig"],
    },
  },
  { timestamps: true }
);

// Hashing

// comparing Passwords

const User = mongoose.model<IUser>("User", userSchema);
export default User;
