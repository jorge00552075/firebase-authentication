import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ChangeInfo from "./pages/ChangeInfo";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Profile />} />
        <Route path="/change/:id" element={<ChangeInfo />} />
        {/* <Route path="*" element={} /> */}
      </Routes>
    </>
  );
}

export default App;
