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
export const getWorkoutById = createAsyncThunk(
  "workout/getWorkoutById",
  async ({ id }: { id: string }, { dispatch, getState, rejectWithValue }) => {
    try {
      const {
        users: { userInfo },
      } = getState() as RootState;
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };
      const { data } = await axios.get(`/api/a1/workouts/${id}`, config);
      // console.log(data);
      return data;
    } catch (error) {
      // toast
      dispatch(toastError(error.response.data.message));
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const updateWorkout = createAsyncThunk(
  "workout/updateWorkout",
  async (
    { id, name }: { id: string; name: string },
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
        `/api/a1/workouts/${id}`,
        { name },
        config
      );
      // console.log(data);
      dispatch(toastSuccess("Workout wurde geändert"));
      dispatch(getAllWorkouts());
      return data;
    } catch (error) {
      // toast
      dispatch(toastError(error.response.data.message));
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const deleteWorkout = createAsyncThunk(
  "workout/deleteWorkout",
  async ({ id }: { id: string }, { dispatch, getState, rejectWithValue }) => {
    try {
      const {
        users: { userInfo },
      } = getState() as RootState;
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };
      const { data } = await axios.delete(
        `/api/a1/workouts/${id}`,

        config
      );
      // console.log(data);
      dispatch(toastSuccess(data.msg));

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
export const getExerciseById = createAsyncThunk(
  "workout/getExerciseById",
  async (
    { workoutId, exerciseId }: { workoutId: string; exerciseId: string },
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
      const { data } = await axios.get(
        `/api/a1/workouts/${workoutId}/exercise/${exerciseId}`,
        config
      );
      // console.log(data);
      return data.exercises.find(
        (exercise: any) => exercise._id === exerciseId
      );
    } catch (error) {
      // toast
      dispatch(toastError(error.response.data.message));
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const deleteExercise = createAsyncThunk(
  "workout/deleteExercise",
  async (
    { workoutId, exerciseId }: { workoutId: string; exerciseId: string },
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
      const { data } = await axios.delete(
        `/api/a1/workouts/${workoutId}/exercise/${exerciseId}`,

        config
      );
      console.log(data);
      dispatch(toastSuccess(data.msg));

      return data;
    } catch (error) {
      // toast
      dispatch(toastError(error.response.data.message));
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const updateExercise = createAsyncThunk(
  "workout/updateExercise",
  async (
    {
      workoutId,
      exerciseId,
      exerciseName,
      exerciseKategory,
    }: {
      workoutId: string;
      exerciseId: string;
      exerciseName: string;
      exerciseKategory: string;
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
        `/api/a1/workouts/${workoutId}/exercise/${exerciseId}`,
        { exerciseName, exerciseKategory },
        config
      );
      // console.log(data);
      dispatch(toastSuccess("Satz wurde geändert"));
      dispatch(getAllWorkouts());
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
export const getSetById = createAsyncThunk(
  "workout/getSetById",
  async (
    {
      workoutId,
      exerciseId,
      setId,
    }: { workoutId: string; exerciseId: string; setId: string },
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
      const { data } = await axios.get(
        `/api/a1/workouts/${workoutId}/exercise/${exerciseId}/set/${setId}`,
        config
      );
      // console.log(data);
      return data.exercises
        .find((exercise: any) => exercise._id === exerciseId)
        .sätze.find((satz: any) => satz._id === setId);
    } catch (error) {
      // toast
      dispatch(toastError(error.response.data.message));
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const deleteSet = createAsyncThunk(
  "workout/deleteSet",
  async (
    {
      workoutId,
      exerciseId,
      setId,
    }: { workoutId: string; exerciseId: string; setId: string },
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
      const { data } = await axios.delete(
        `/api/a1/workouts/${workoutId}/exercise/${exerciseId}/set/${setId}`,

        config
      );
      // console.log(data);
      dispatch(toastSuccess(data.msg));

      return data;
    } catch (error) {
      // toast
      dispatch(toastError(error.response.data.message));
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const updateSet = createAsyncThunk(
  "workout/updateSet",
  async (
    {
      workoutId,
      exerciseId,
      setId,
      gewicht,
      wdh,
    }: {
      workoutId: string;
      exerciseId: string;
      setId: string;
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
        `/api/a1/workouts/${workoutId}/exercise/${exerciseId}/set/${setId}`,
        { gewicht, wdh },
        config
      );
      // console.log(data);
      dispatch(toastSuccess("Satz wurde geändert"));
      dispatch(getAllWorkouts());
      return data;
    } catch (error) {
      // toast
      dispatch(toastError(error.response.data.message));
      return rejectWithValue(error.response.data.message);
    }
  }
);
// Types
interface ISatz {
  gewicht: number;
  wdh: number;
  _id: string;
}
export interface IExercise {
  _id: string;
  exerciseName: string;
  exerciseKategory: string;
  exercise: string;
  sätze: ISatz[];
}
export interface IWorkout {
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
  singleWorkout: IWorkout | null;
  singleSet: ISatz | null;
  singleExercise: IExercise | null;
}
// init State
const initialState: IInitState = {
  loading: false,
  error: "",
  workoutInfo: null,
  änderung: false,
  singleWorkout: null,
  singleSet: null,
  singleExercise: null,
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
    // get Workout by ID
    builder.addCase(getWorkoutById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getWorkoutById.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = "";
      state.singleWorkout = payload;
    });
    builder.addCase(getWorkoutById.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    // update Workout by ID
    builder.addCase(updateWorkout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateWorkout.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(updateWorkout.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    // delete Workout by ID
    builder.addCase(deleteWorkout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteWorkout.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
      state.änderung = true;
    });
    builder.addCase(deleteWorkout.rejected, (state, { payload }) => {
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
    // get exercise by ID
    builder.addCase(getExerciseById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getExerciseById.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = "";
      state.singleExercise = payload;
    });
    builder.addCase(getExerciseById.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    // delete Exercise by ID
    builder.addCase(deleteExercise.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteExercise.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
      state.änderung = true;
    });
    builder.addCase(deleteExercise.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    // update Exercise by ID
    builder.addCase(updateExercise.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateExercise.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
      state.änderung = true;
    });
    builder.addCase(updateExercise.rejected, (state, { payload }) => {
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
    // get Set by ID
    builder.addCase(getSetById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSetById.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = "";
      state.singleSet = payload;
    });
    builder.addCase(getSetById.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    // delete Set by ID
    builder.addCase(deleteSet.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteSet.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
      state.änderung = true;
    });
    builder.addCase(deleteSet.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    // update Set by ID
    builder.addCase(updateSet.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateSet.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
      state.änderung = true;
    });
    builder.addCase(updateSet.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const { clearState } = workoutSlice.actions;
