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
const router = express.Router();
// Register
router.route("/register").post(registerValidator, runValidation, register);
// Login
router.route("/login").post(loginValidator, runValidation, login);
// Get logged user
router.route("/me").get(protect, getLoggedUser);

export default router;
