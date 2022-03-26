import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Center, Spinner } from "@chakra-ui/react";
import AuthContext from "./context/auth-context.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import Profile from "./pages/Profile.jsx";
import ProfileUpdate from "./pages/ProfileUpdate.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
  console.log("🏃‍♀️ Running App!");
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
// I can register a new account ✅
// I can log in ✅
// I can sign out ✅
// I can log in or register with Google, Facebook, Twitter or Github
// I can see my profile details ✅
// I can edit my details including: photo, name, bio, phone, email and password ✅
// I can upload a new photo or provide an image URL ✅

// PROBLEMS
// need loading spinner on image upload
// on sign pages routes to home briefly then profile page
// upload image re-do

// create images with name & Date.now()
