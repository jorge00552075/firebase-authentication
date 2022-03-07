import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AuthContext from "./context/auth/auth-context.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import AccountUpdatePage from "./pages/AccountUpdatePage.jsx";

function App() {
  const authContext = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        {
          // Protected Route
          authContext.isLoggedIn && (
            <Route path="/account/:id" element={<AccountPage />} />
          )
        }
        {
          // Protected Route
          authContext.isLoggedIn && (
            <Route path="/account/:id/update" element={<AccountUpdatePage />} />
          )
        }
        <Route path="*" element={<Navigate to="/signup" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
/*
User stories
I can register a new account
I can log in
I can log in or register with at least one of the following services: Google, Facebook, Twitter or Github
I can sign out
I can see my profile details
I can edit my details including: photo, name, bio, phone, email and password
I can upload a new photo or provide an image URL
*/
