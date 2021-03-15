import * as React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
// Store
import { store } from "./store";

import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ChakraProvider resetCSS>
        <App />
      </ChakraProvider>
    </Router>
  </Provider>,
  document.getElementById("root")
);
