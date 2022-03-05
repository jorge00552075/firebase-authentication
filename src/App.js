import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import EditAccountPage from "./pages/EditAccountPage.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/sign-up" />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/my-account/:id" element={<AccountPage />} />
        <Route path="/edit-account/:id" element={<EditAccountPage />} />
        <Route path="*" element={<NotFound />} />
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
