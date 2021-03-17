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
export const getAllWorkouts = createAsyncThunk(
  "workout/getAllWorkouts",
  async (_, { dispatch, getState, rejectWithValue }) => {
    try {
      const {
        users: { userInfo },
      } = getState() as RootState;
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };
      const { data } = await axios.get("/api/a1/workouts", config);
      // console.log(data);
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
// Add exercise to a workout
export const addExerciseToWorkout = createAsyncThunk(
  "workout/addExerciseToWorkout",
  async (
    {
      id,
      exerciseName,
      exerciseKategory,
      exercise,
      sätze,
    }: {
      id: string;
      exerciseName: string;
      exerciseKategory: string;
      exercise: string;
      sätze: any[];
    },
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
      const { data } = await axios.put(
        `/api/a1/workouts/${id}/exercise`,
        { exerciseName, exerciseKategory, exercise, sätze },
        config
      );
      // console.log(data);
      dispatch(toastSuccess("Die Übung wurde hinzugefügt"));
      return data;
    } catch (error) {
      // toast
      dispatch(toastError(error.response.data.message));
      return rejectWithValue(error.response.data.message);
    }
  }
);
// ===================================================================
// ==========================SET======================================
// ===================================================================
// Add set to an excercise to a workout
export const addSetExercise = createAsyncThunk(
  "workout/addSetExercise",
  async (
    {
      workoutId,
      id,
      gewicht,
      wdh,
    }: {
      id: string;
      workoutId: string;
      gewicht: number;
      wdh: number;
    },
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
      const { data } = await axios.put(
        `/api/a1/workouts/${workoutId}/exercise/${id}/set`,
        { gewicht, wdh },
        config
      );
      // console.log(data);
      dispatch(toastSuccess("Satz wurde hinzugefügt"));
      return data;
    } catch (error) {
      // toast
      dispatch(toastError(error.response.data.message));
      return rejectWithValue(error.response.data.message);
    }
  }
);
// Types
interface IExercise {
  _id: string;
  exerciseName: string;
  exerciseKategory: string;
  exercise: string;
  sätze: any[];
}
interface IWorkout {
  _id: string;
  name: string;
  user: string;
  username: string;
  exercises: IExercise[];
  createdAt: string;
}
interface IInitState {
  loading: boolean;
  error: any;
  workoutInfo: IWorkout[] | null;
  änderung: boolean;
}
// init State
const initialState: IInitState = {
  loading: false,
  error: "",
  workoutInfo: null,
  änderung: false,
};

// Slices
export const workoutSlice = createSlice({
  name: "workout",
  initialState,
  reducers: {
    clearState: (state) => {
      state.änderung = false;
    },
  },
  extraReducers: (builder) => {
    // Create Workout
    builder.addCase(createWorkout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createWorkout.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = "";
      state.workoutInfo?.push(payload);
    });
    builder.addCase(createWorkout.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    // get Workouts
    builder.addCase(getAllWorkouts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllWorkouts.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = "";
      state.workoutInfo = payload;
    });
    builder.addCase(getAllWorkouts.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    // ===================================================================
    // ==========================Exercise=================================
    // ===================================================================
    // Add exercise to a workout
    builder.addCase(addExerciseToWorkout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addExerciseToWorkout.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
      state.änderung = true;
    });
    builder.addCase(addExerciseToWorkout.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    // ===================================================================
    // ==========================SET======================================
    // ===================================================================
    // Add exercise to a workout
    builder.addCase(addSetExercise.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addSetExercise.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
      state.änderung = true;
    });
    builder.addCase(addSetExercise.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const { clearState } = workoutSlice.actions;
