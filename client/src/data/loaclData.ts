interface IÜbungen {
  id: string;
  übung: string;
  kategorie: string[];
  sätze: number;
  reps: number[];
}
interface IBeispielWorkout {
  name: string;
  übungen: IÜbungen[];
  user: string;
  date: string;
}

interface IDasboard {
  id: string;
  name: string;
  übungen: string[];
}

export const kategorien: string[] = [
  "Brust",
  "Arme",
  "Schulter",
  "Beine",
  "Bauch",
  "Rücken",
  "Unterer Rücken",
];

// Add a new Exercise

export const übungen: IÜbungen[] = [
  {
    id: "1",
    übung: "Bankdrücken",
    kategorie: ["Brust", "Arme"],
    sätze: 5,
    reps: [5, 5, 5, 5, 4],
  },
  {
    id: "2",
    übung: "Overhead Press",
    kategorie: ["Schulter", "Arme"],
    sätze: 5,
    reps: [5, 5, 5, 5, 4],
  },
];

// Add a new workout

export const beispielWorkout: IBeispielWorkout[] = [
  {
    name: "Push Day",
    übungen,
    user: "eddy",
    date: "12.03.2021",
  },
];

// Dasboard

export const dashboard: IDasboard[] = [
  { id: "1", name: "Push Day", übungen: ["Bankdrücken", "Schulterdrücken"] },
];
