import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import AccountPage from "./pages/AccountPage";
import EditAccountPage from "./pages/EditAccountPage";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/:id" element={<AccountPage />} />
        <Route path="/:id/edit" element={<EditAccountPage />} />
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
