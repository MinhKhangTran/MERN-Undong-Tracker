import { render } from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";

const rootElement = document.getElementById("root");
render(
  <Router>
    <ChakraProvider resetCSS>
      <App />
    </ChakraProvider>
  </Router>,
  rootElement
);
