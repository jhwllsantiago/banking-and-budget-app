import { useState, useEffect } from "react";
import "./Signup.scss";
import capitalize from "../Utility/capitalize.js";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const USERS = localStorage.getItem("USERS");
  const initialUsers = USERS ? JSON.parse(USERS) : [];

  const navigate = useNavigate();
  const [users, setUsers] = useState(initialUsers);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(true);
  const [amount, setAmount] = useState("");
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    localStorage.setItem("USERS", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (firstname.trim().length > 0) {
      setFirstname(capitalize(firstname));
    }
  }, [firstname]);

  useEffect(() => {
    if (lastname.trim().length > 0) {
      setLastname(capitalize(lastname));
    }
  }, [lastname]);

  const handlePassword = (value) => {
    setPasswordValid(() => (value.length > 7 ? true : false));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsers((prev) => [
      ...prev,
      { firstname, lastname, username, password, amount },
    ]);
    setTimeout(() => {
      navigate("/");
    }, 50);
  };

  return (
    <form className="Signup" onSubmit={handleSubmit}>
      <h3>{firstname.trim().length ? `Hello, ${firstname}!` : `Hello!`}</h3>
      <div className="form-control">
        <label>First Name</label>
        <input
          type="text"
          required
          spellCheck="false"
          autoComplete="false"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value.replace(/[^a-z]/gi, ""))}
        />
      </div>
      <div className="form-control">
        <label>Last Name</label>
        <input
          type="text"
          required
          spellCheck="false"
          autoComplete="false"
          value={lastname}
          onChange={(e) => setLastname(e.target.value.replace(/[^a-z]/gi, ""))}
        />
      </div>
      <div className="form-control">
        <label>Username</label>
        <input
          type="text"
          required
          spellCheck="false"
          autoComplete="false"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Password</label>
        <input
          type="password"
          required
          spellCheck="false"
          autoComplete="false"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            handlePassword(e.target.value);
          }}
          onBlur={(e) => handlePassword(e.target.value)}
          className={passwordValid ? "" : "test"}
        />
      </div>
      <div className="form-control">
        <label>Deposit amount</label>
        <input
          type="text"
          spellCheck="false"
          autoComplete="false"
          value={amount}
          onChange={(e) => setAmount(e.target.value.replace(/\D/g, ""))}
        />
      </div>
      <div className="form-control">
        <input
          type="checkbox"
          name="checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
        <label htmlFor="checkbox">I agree to the Terms and Conditions</label>
      </div>

      <button>Signup</button>
    </form>
  );
};

export default Signup;
