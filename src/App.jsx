import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Admin from "./pages/Admin";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import User from "./pages/User";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/user/*" element={<User />} />
        <Route
          path="login/client" // eslint-disable-next-line 
          element={<Login data="USERS" logged="user" style="login-client-form" />}
        />
        <Route
          path="login/admin"
          element={ // eslint-disable-next-line 
            <Login data="ADMINS" logged="admin" style="login-admin-form" />
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
