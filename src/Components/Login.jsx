import "./Login.scss";
import Header from "../parts/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Login = ({ data, style }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const adminArray = [
    { username: "admin", password: "admin" },
    { username: "admin_log", password: "thisisadmin" },
  ];
  localStorage.setItem("ADMINS", JSON.stringify(adminArray));
  const savedData = localStorage.getItem(data)
    ? JSON.parse(localStorage.getItem(data))
    : [];

  const [detailsValid, setDetailsValid] = useState(null);

  const [details, setDetails] = useState({
    username: "",
    password: "",
  });


  const user = location.pathname.split("/").pop();

  useEffect(() => {

    if (detailsValid) {
      localStorage.setItem(
        "LOGGED_IN",
        JSON.stringify({ user: details.username })
      );
      if (user === "client") {
        navigate(`/user`);
      } else if (user === "admin") {
        navigate(`/admin`);
      }
    }
  }, [detailsValid]);

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

  return (
    <>
      <Header />
      <div className="login">
        <form onSubmit={handleSubmit} className={style}>
          <h2>Hello{user === "admin" && <span>, Admin</span> }!</h2>
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
          { detailsValid === false && <span>wrong username / password</span>}
        </form>
      </div>
    </>
  );
};

export default Login;
