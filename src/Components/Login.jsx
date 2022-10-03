import "./Login.scss";
import Header from "../parts/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Login = ({ data }) => {
  const navigate = useNavigate();
  // const location = useLocation();
  const savedData = localStorage.getItem(data)
    ? JSON.parse(localStorage.getItem(data))
    : [];

  const [detailsValid, setDetailsValid] = useState(false);

  const [details, setDetails] = useState({
    username: "",
    password: "",
  });

  // useEffect(() => {
  //   detailsValid ? navigate("/");
  //   console.log("is it valid?", detailsValid);
  // }, [detailsValid]);
// console.log("saved data", savedData)

  const handleSubmit = (e) => {
    e.preventDefault();
    setDetailsValid(
      savedData.some((data) => {
        return (
          data.username === details.username &&
          data.password === details.password
        );
      })
    );
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
      {!detailsValid && <span>invalid</span>}
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
              value={details.password}
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
