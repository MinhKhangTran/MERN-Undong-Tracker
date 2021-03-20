import express from "express";
import morgan from "morgan";
import cors from "cors";
import colors from "colors";
import User from "./models/User";
import path from "path";

// Routes
import userRoutes from "./routes/users";
import exerciseRoutes from "./routes/exercises";
import workoutRoutes from "./routes/workouts";

// Middlewares
import { notFound, errorHandler } from "./middlewares/errorMiddleware";

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
app.use("/api/a1/users", userRoutes);
app.use("/api/a1/exercises", exerciseRoutes);
app.use("/api/a1/workouts", workoutRoutes);

// for deploying
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}
// Error Middlewares
app.use(notFound);
app.use(errorHandler);

// Port Running
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(colors.bgBlue(`Server is running on Port ${PORT}`));
});
