import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

// types
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  // methods
  comparePassword: (this: any, candidatePW: string) => boolean;
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
userSchema.pre<IUser>("save", async function (next) {
  let user = this;
  if (user.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
  }
  next();
});

// comparing Passwords
userSchema.methods.comparePassword = async function (
  this: any,
  candidatePW: string
) {
  return await bcrypt.compare(candidatePW, this.password);
};

const User = mongoose.model<IUser>("User", userSchema);
export default User;
