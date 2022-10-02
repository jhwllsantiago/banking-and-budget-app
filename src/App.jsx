import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Admin from "./pages/Admin";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="login/client" element={<Login usersData="USERS" />} />
        <Route path="login/admin" element={<Login usersData="ADMINS" />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
