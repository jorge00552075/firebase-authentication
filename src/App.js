import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Center, Spinner } from "@chakra-ui/react";
import AuthContext from "./context/auth/auth-context.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import AccountUpdatePage from "./pages/AccountUpdatePage.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
  const authContext = useContext(AuthContext);

  const isAuthenticated = !!authContext.user;
  if (authContext.isLoading) {
    return (
      <Center h="100vh">
        <Spinner thickness="4px" color="blue.500" size="xl" />
      </Center>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        {isAuthenticated && <Route path="/account" element={<AccountPage />} />}
        {isAuthenticated && (
          <Route path="/account/update" element={<AccountUpdatePage />} />
        )}
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
