import { configureStore } from "@reduxjs/toolkit";
import { exerciseSlice } from "../features/exercises/exerciseSlice";
import { toastSlice } from "../features/toast/toastSlice";
import { userSlice } from "../features/users/userSlice";
import { workoutSlice } from "../features/workout/workoutSlice";

// types
interface IUserInit {
  username: string;
  email: string;
  token: string;
  _id: string;
}

const userInit: IUserInit = {
  username: "",
  email: "",
  token: "",
  _id: "",
};

// initState from localStorage
const userInfoFromLocalStorage = () => {
  const userInfo = localStorage.getItem("userInfo");
  if (userInfo) {
    return JSON.parse(userInfo);
  } else {
    return userInit;
  }
};
// types
interface IPreloadedState {
  users: {
    userInfo: IUserInit;
    loading: boolean;
    error: any;
  };
}

const preloadedState: IPreloadedState = {
  users: {
    userInfo: userInfoFromLocalStorage(),
    loading: false,
    error: "",
  },
};

// store
export const store = configureStore({
  reducer: {
    exercise: exerciseSlice.reducer,
    workout: workoutSlice.reducer,
    users: userSlice.reducer,
    toast: toastSlice.reducer,
  },
  preloadedState,
});

export type RootState = ReturnType<typeof store.getState>;
