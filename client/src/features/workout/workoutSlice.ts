import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../store";
import { toastError, toastSuccess } from "../toast/toastSlice";
axios.defaults.headers.post["Content-Type"] = "application/json";
// Async actions
// ===================================================================
// ==========================Workout==================================
// ===================================================================

export const createWorkout = createAsyncThunk(
  "workout/createWorkout",
  async (
    { name }: { name: string },
    { dispatch, getState, rejectWithValue }
  ) => {
    try {
      const {
        users: { userInfo },
      } = getState() as RootState;
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };
      const { data } = await axios.post("/api/a1/workouts", { name }, config);
      dispatch(toastSuccess("Diese Einheit wurde hinzugefügt!"));
      return data;
    } catch (error) {
      // toast
      dispatch(toastError(error.response.data.message));
      return rejectWithValue(error.response.data.message);
    }
  }
);
// ===================================================================
// ==========================Exercise=================================
// ===================================================================

// ===================================================================
// ==========================SET======================================
// ===================================================================

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
  workoutInfo: any;
}
// init State
const initialState: IInitState = {
  loading: false,
  error: "",
  workoutInfo: null,
};

// Slices
export const workoutSlice = createSlice({
  name: "workout",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createWorkout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createWorkout.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = "";
      state.workoutInfo = payload;
    });
    builder.addCase(createWorkout.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});
