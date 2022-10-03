import "./Login.scss";
import Header from "../parts/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Login = ({ data }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const savedData = localStorage.getItem(data)
    ? JSON.parse(localStorage.getItem(data))
    : [];

  const [detailsValid, setDetailsValid] = useState(false);

  const [details, setDetails] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    let active = savedData.find((data) => {
      return data.username === details.username
    })
    console.log("active_obj", active)
    // console.log("active_user", active['accountNumber'])

    if (detailsValid) {
      localStorage.setItem("LOGGED_IN", JSON.stringify({user: details.username}));
      navigate(`/user`);
    }
  }, [detailsValid]);

  // const path = location.pathname.split("/").pop();


  // const getAccountNumber = () => {
  //   savedData.some((data) => {
  //     if (data.username === details.username) {
  //       return data.accountNumber;
  //     }
  //   });
  // };


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

    setDetailsValid ? console.log(data.accountNumber) : console.log("non");
    console.log("current location", location.pathname);
    // console.log("path", path);
    // console.log('active', active)
  };

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
              value={details.password}
              onChange={(e) =>
                setDetails({ ...details, password: e.target.value })
              }
              required
            />
          </div>
          <button type="submit">Login</button>
          {!detailsValid && <span>wrong username / password</span>}
        </form>
      </div>
    </>
  );
};

export default Login;
