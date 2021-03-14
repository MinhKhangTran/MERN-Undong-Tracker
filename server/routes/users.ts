import express, { Request, Response } from "express";
// controllers
import { register, login, getLoggedUser } from "../controllers/users";
// middlewares
import { protect } from "../middlewares/authMiddleware";

// validators
import {
  registerValidator,
  loginValidator,
} from "../validators/userValidators";
import { runValidation } from "../validators";

// Init Router
const route = express.Router();
// Register
route.post("/register", registerValidator, runValidation, register);
// Login
route.post("/login", loginValidator, runValidation, login);
// Get logged user
route.get("/me", protect, getLoggedUser);

export default route;
