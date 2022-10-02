import "./Login.scss";
import Header from "../parts/Header";
import { useLocation, useNavigate } from "react-router-dom";

const Login = ({ usersData }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const loginCreds = localStorage.getItem(usersData)
    ? JSON.parse(localStorage.getItem(usersData))
    : [];

  const handleSubmit = () => {
    location.pathname === "/login/client"
      ? navigate("/")
      : navigate("/admin/dashboard");
  };

  return (
    <>
      <Header />
      <div className="login">
        <div className="login-container">
          <form onSubmit={handleSubmit} className="login-form-container">
            <h2>Hello!</h2>
            <div className="input-container">
              <label>Username:</label>
              <input type="text" required />
            </div>
            <div className="input-container">
              <label>Password:</label>
              <input type="password" required />
            </div>
            <button>Login</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
