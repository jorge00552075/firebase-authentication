import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Center, Spinner } from "@chakra-ui/react";
import AuthContext from "./context/auth-context.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import UpdateAccountPage from "./pages/UpdateAccountPage.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
  const { loading, user } = useContext(AuthContext);

  if (loading) {
    return (
      <Center h="50vh">
        <Spinner thickness="4px" color="blue.500" size="xl" />
      </Center>
    );
  }

  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      {user && <Route path="/account" element={<AccountPage />} />}
      {user && <Route path="/account/update" element={<UpdateAccountPage />} />}
      <Route path="/" element={<Navigate to="/auth" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
