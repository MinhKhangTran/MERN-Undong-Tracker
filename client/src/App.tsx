import * as React from "react";
import { Box } from "@chakra-ui/react";
import { Route, Switch, Redirect } from "react-router-dom";
// Layout
import Layout from "./components/Layout";
// pages
import Home from "./pages/Home";
import Login from "./features/users/Login";
import Register from "./features/users/Register";
import ErrorPage from "./pages/ErrorPage";

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
    path: "*",
    exact: false,
    component: ErrorPage,
    private: false,
  },
];

const App = () => {
  return (
    <Layout>
      <Switch>
        {routes.map((route, index) => {
          return (
            <Route key={index} path={route.path} exact={route.exact}>
              {route.component}
            </Route>
          );
        })}
      </Switch>
    </Layout>
  );
};
export default App;