import { render } from "react-dom";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme/index";
import "./theme/styles.css";
import { AuthProvider } from "./context/auth-context";

render(
  <AuthProvider>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </AuthProvider>,
  document.getElementById("root")
);
