import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.headers.post["Content-Type"] = "application/json";
// Async actions
export const getExercises = createAsyncThunk(
  "exercises/getExercises",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/a1/exercises");
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

// Types
interface IExercise {
  name: string;
  category:
    | "Brust"
    | "Arme"
    | "Schulter"
    | "Beine"
    | "Bauch"
    | "Rücken"
    | "Unterer Rücken";
}
interface IInitState {
  loading: boolean;
  error: any;
  exerciseInfo: IExercise | null;
}
// init State
const initialState: IInitState = {
  loading: false,
  error: "",
  exerciseInfo: null,
};

// Slices
export const exerciseSlice = createSlice({
  name: "exercises",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getExercises.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getExercises.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = "";
      state.exerciseInfo = payload;
    });
    builder.addCase(getExercises.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});
