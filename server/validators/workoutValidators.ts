import { check } from "express-validator";

export const createWorkoutValidator = [
  check("name", "Ein Name ist nötig").notEmpty(),
];
