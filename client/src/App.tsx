import React from "react";

import { Route, Switch, Redirect, RouteProps } from "react-router-dom";
// Layout
import Layout from "./components/Layout";
// pages
import Home from "./pages/Home";
import Login from "./features/users/Login";
import Register from "./features/users/Register";
import ErrorPage from "./pages/ErrorPage";
import WorkoutForm from "./features/workout/WorkoutForm";
import ExerciseForm from "./features/exercises/ExerciseForm";
import SetForm from "./features/exercises/SetForm";
import WorkoutUpdateForm from "./features/workout/WorkoutUpdateForm";
import SetUpdateForm from "./features/exercises/SetUpdateForm";
import ExerciseCreate from "./features/exercises/ExerciseCreate";
import { RootState } from "./store";
import { useSelector } from "react-redux";
import ExerciseUpdate from "./features/exercises/ExerciseUpdate";

interface IRoute {
  path: string;
  exact: boolean;
  component: any;
  private: boolean;
}

const routes: IRoute[] = [
  {
    path: "/",
    exact: true,
    component: Home,
    private: false,
  },
  {
    path: "/login",
    exact: false,
    component: Login,
    private: false,
  },
  {
    path: "/register",
    exact: false,
    component: Register,
    private: false,
  },
  {
    path: "/workout",
    exact: true,
    component: WorkoutForm,
    private: true,
  },
  {
    path: "/workout/:id",
    exact: true,
    component: WorkoutUpdateForm,
    private: true,
  },
  {
    path: "/workout/:id/exercise",
    exact: true,
    component: ExerciseForm,
    private: true,
  },
  {
    path: "/workout/:workoutId/exercise/:id/set",
    exact: true,
    component: SetForm,
    private: true,
  },
  {
    path: "/workout/:workoutId/exercise/:exerciseId/set/:setId",
    exact: true,
    component: SetUpdateForm,
    private: true,
  },
  {
    path: "/exercise/create",
    exact: true,
    component: ExerciseCreate,
    private: true,
  },
  {
    path: "/workout/:workoutId/exercise/:exerciseId/update",
    exact: true,
    component: ExerciseUpdate,
    private: true,
  },
  {
    path: "*",
    exact: false,
    component: ErrorPage,
    private: false,
  },
];

const PrivateRoute = (props: RouteProps) => {
  const { userInfo } = useSelector((state: RootState) => state.users);
  const { children, ...rest } = props;
  return (
    <Route
      {...rest}
      render={() => {
        return userInfo?._id.length !== 0 ? (
          children
        ) : (
          <Redirect to="/"></Redirect>
        );
      }}
    ></Route>
  );
};

const App = () => {
  return (
    <Layout>
      <Switch>
        {routes.map((route, index) => {
          const RouteType = route.private ? PrivateRoute : Route;
          return (
            <RouteType key={index} path={route.path} exact={route.exact}>
              <route.component />
            </RouteType>
          );
        })}
      </Switch>
    </Layout>
  );
};
export default App;
