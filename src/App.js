import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import AuthContext from "./context/auth/auth-context.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import AccountUpdatePage from "./pages/AccountUpdatePage.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
  const authContext = useContext(AuthContext);
  console.log("is logged in from App:", !!authContext.user);
  !!authContext.user && console.log("is logged in from App");

  const isAuthenticated = !!authContext.user;

  if (authContext.isLoading) {
    return <Spinner />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        {
          // Protected Route
          isAuthenticated && <Route path="/account" element={<AccountPage />} />
        }
        {
          // Protected Route
          isAuthenticated && (
            <Route path="/account/update" element={<AccountUpdatePage />} />
          )
        }
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
