import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toastError, toastSuccess } from "../toast/toastSlice";
import { RootState } from "../../store";
axios.defaults.headers.post["Content-Type"] = "application/json";

// types
interface IUserInfo {
  _id: string;
  username: string;
  email: string;
  token: string;
}
interface IInitState {
  loading: boolean;
  error: any;
  userInfo: IUserInfo | null;
}

// initState
const initState: IInitState = {
  loading: false,
  error: "",
  userInfo: {
    username: "",
    email: "",
    token: "",
    _id: "",
  },
};

// async actions
// Login
export const login = createAsyncThunk(
  "users/login",
  async (
    { email, password }: { email: string; password: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post("/api/a1/users/login", {
        email,
        password,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      dispatch(toastSuccess("Willkommen zurück"));
      return data;
    } catch (error) {
      // toast
      dispatch(toastError(error.response.data.message));
      return rejectWithValue(error.response.data.message);
    }
  }
);

// register
export const register = createAsyncThunk(
  "users/register",
  async (
    {
      username,
      email,
      password,
    }: { username: string; email: string; password: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post("/api/a1/users/register", {
        username,
        email,
        password,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      dispatch(toastSuccess("Wilkommen"));
      return data;
    } catch (error) {
      // toast
      dispatch(toastError(error.response.data.message));
      return rejectWithValue(error.response.data.message);
    }
  }
);
// Logout
export const logoutUser = createAsyncThunk(
  "users/logout",
  async (_, { dispatch }) => {
    dispatch(toastSuccess("Bis bald :D"));
    localStorage.removeItem("userInfo");

    return initState;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = "";
      state.userInfo = payload;
    });
    builder.addCase(login.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    // Register
    builder.addCase(register.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(register.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = "";
      state.userInfo = payload;
    });
    builder.addCase(register.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    // ======================LOGOUT======================

    builder.addCase(logoutUser.fulfilled, (state) => {
      return initState;
    });
  },
});
