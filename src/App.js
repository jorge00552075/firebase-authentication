import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthContext from "./context/auth-context.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import UpdateAccountPage from "./pages/UpdateAccountPage.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
  const { currentUser } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      {currentUser && <Route path="/account" element={<AccountPage />} />}
      {currentUser && (
        <Route path="/account/update" element={<UpdateAccountPage />} />
      )}
      <Route path="/" element={<Navigate to="/auth" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
// add loading spinner
// add animations
