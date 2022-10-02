import "./Login.scss";
import Header from "../parts/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = ({ data }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const loginCreds = localStorage.getItem(data)
    ? JSON.parse(localStorage.getItem(data))
    : [];

  const [details, setDetails] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    {console.log('enlozi')}
    console.log(details)
    // data(details)
  };

  // const [username, setUsername] = useState("")
  // const [usernameValid, setUsernameValid] = useState(false)
  // const [password, setPassword] = useState("")
  // const [passwordValid, setPasswordValid] = useState(false)

  //   const handleLogin = () => {
  //     setUsername(username);
  //     setPassword(password);
  //     setUsernameValid(loginCreds.some((data) => data.username === username & data.password === password)
  //   };

  // "username doesn't exist" || "incorrect password"
  // const [users, setUsers] = useState(loginCreds);

  // const [username, setUsername] = useState("");
  // const [usernameValid, setUsernameValid] = useState("false");

  // const handleSubmit = () => {
  //   location.pathname === "/login/client"
  //     ? navigate("/")
  //     : navigate("/admin/dashboard");
  // };

  
  // onSubmit={handleSubmit}
  return (
    <>
      <Header />
      <div className="login">
        <form onSubmit={handleSubmit} className="login-form-container">
          <h2>Hello!</h2>
          <div className="input-container">
            <label>Username:</label>
            <input
              type="text"
              value={details.username}
              onChange={(e) =>
                setDetails({ ...details, username: e.target.value })
              }
              required
            />
          </div>
          <div className="input-container">
            <label>Password:</label>
            <input
              type="password"
              // value={password}
              onChange={(e) =>
                setDetails({ ...details, password: e.target.value })
              }
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
