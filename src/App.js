import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthContext from "./context/auth-context.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import Account from "./pages/Account.page.jsx";
import UpdateAccountPage from "./pages/UpdateAccountPage.jsx";
import NotFound from "./pages/NotFound.jsx";
import LoadingSpinner from "./components/LoadingSpinner.jsx";

function App() {
  const { currentUser, loading } = useContext(AuthContext);

  if (loading) return <LoadingSpinner />;
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      {currentUser && <Route path="/MyAccount" element={<Account />} />}
      {currentUser && (
        <Route path="/MyAccount/update" element={<UpdateAccountPage />} />
      )}
      <Route path="/" element={<Navigate to="/auth" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
// add animations
