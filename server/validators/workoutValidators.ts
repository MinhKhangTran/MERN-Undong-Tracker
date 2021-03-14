import { check } from "express-validator";

export const createExValidator = [
  check("name", "Ein Name ist nötig").notEmpty(),
  check("category", "Eine Kategorie ist nötig")
    .notEmpty()
    .isIn([
      "Brust",
      "Arme",
      "Schulter",
      "Beine",
      "Bauch",
      "Rücken",
      "Unterer Rücken",
    ]),
];
