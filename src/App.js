import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Account from "./pages/Account";
import EditPage from "./pages/EditPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Account />} />
        <Route path="/:id/edit" element={<EditPage />} />
        {/* <Route path="*" element={} /> */}
      </Routes>
    </>
  );
}

export default App;
// path="/", LoginPage (if not authenticated)
// reroute to path="/:accountId", AccountPage (if authenticated)
// path="/:accountId", AccountPage
// path="/:accountId/editInfo", EditPage
