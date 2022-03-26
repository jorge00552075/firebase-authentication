import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Center, Spinner } from "@chakra-ui/react";
import AuthContext from "./context/auth-context.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import Profile from "./pages/Profile.jsx";
import ProfileUpdate from "./pages/ProfileUpdate.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
  const authContext = useContext(AuthContext);
  const isAuthenticated = !!authContext.user;
  if (authContext.loading) {
    return (
      <Center h="50vh">
        <Spinner thickness="4px" color="blue.500" size="xl" />
      </Center>
    );
  }

  return (
    <Routes>
      <Route path="/signup" element={<AuthPage />} />
      {
        // Private Route
        isAuthenticated && <Route path="/profile" element={<Profile />} />
      }
      {
        // Private Route
        isAuthenticated && (
          <Route path="/profile/update" element={<ProfileUpdate />} />
        )
      }
      <Route path="/" element={<Navigate to="/signup" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
// USER STORIES
// I can edit my email and password ✅

// ISSUES TO FIX ❌
// on sign pages routes to home briefly then profile page
// Fix Google sign in button CSS
// Fix image upload css
