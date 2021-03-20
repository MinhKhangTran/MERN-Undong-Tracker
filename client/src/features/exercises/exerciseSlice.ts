import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { RootState } from "../../store";
import { toastError, toastSuccess } from "../toast/toastSlice";
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
export const createExercise = createAsyncThunk(
  "exercises/createExercise",
  async (
    { name, category }: { name: string; category: string },
    { dispatch, rejectWithValue, getState }
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
      const { data } = await axios.post(
        "/api/a1/exercises",
        {
          name,
          category,
        },
        config
      );
      dispatch(toastSuccess("Neue Übung wurde hinzugefügt 🤓"));
      return data;
    } catch (error) {
      // toast
      dispatch(toastError(error.response.data.message));
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Types
export type TCategory =
  | "Brust"
  | "Arme"
  | "Schulter"
  | "Beine"
  | "Bauch"
  | "Rücken"
  | "Unterer Rücken";

interface IExercise {
  _id: string;
  name: string;
  category: string;
}
interface IInitState {
  loading: boolean;
  error: any;
  exerciseInfo: IExercise[] | null;
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
    // add exercise
    builder.addCase(createExercise.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createExercise.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(createExercise.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});
