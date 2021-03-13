import express from "express";
import morgan from "morgan";
import cors from "cors";
import colors from "colors";
import User from "./models/User";

// Routes

// Middlewares

// Dotenv config
import "dotenv/config";

// connectDB
import connectDB from "./config/db";
connectDB();

// init app
const app = express();

// middlewares
app.use(express.json());
app.use(cors());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Testing
app.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
});

// Routing

// Error Middlewares

// Port Running
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(colors.bgBlue(`Server is running on Port ${PORT}`));
});
