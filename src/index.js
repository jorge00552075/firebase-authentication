import { render } from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme/index";
import "./theme/styles.css";
import { AuthProvider } from "./context/auth/auth-context.jsx";

render(
  <BrowserRouter>
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ChakraProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
