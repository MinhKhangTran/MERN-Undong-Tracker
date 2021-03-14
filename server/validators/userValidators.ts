import { check } from "express-validator";

export const registerValidator = [
  check("username", "Ein Benutzername ist nötig").notEmpty(),
  check("email", "Eine E-Mail Adresse ist nötig").notEmpty().isEmail(),
  check("password", "Ein Password ist nötig").notEmpty().isLength({ min: 6 }),
];

export const loginValidator = [
  check("email", "Eine E-Mail Adresse ist nötig").notEmpty().isEmail(),
  check("password", "Ein Password ist nötig").notEmpty().isLength({ min: 6 }),
];
