import { useState, useEffect } from "react";
import capitalize from "../Utility/capitalize.js";
import "./SignUpForm.scss";

const SignUpForm = ({
  handleSubmitEvent,
  watchSubmitEvent,
  showHeader,
  showCheckbox,
  buttonText,
}) => {
  const USERS = localStorage.getItem("USERS");
  const initialUsers = USERS ? JSON.parse(USERS) : [];

  const [users, setUsers] = useState(initialUsers);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [usernameValid, setUsernameValid] = useState(true);
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(true);
  const [amount, setAmount] = useState("");
  const [checked, setChecked] = useState(false);

  const handleFirstName = (value) => {
    setFirstName(value.replace(/[^a-z, ]/gi, "").replace(/\s+/g, " "));
  };
  useEffect(() => {
    if (firstName.trim().length > 0) {
      setFirstName(capitalize(firstName));
    }
  }, [firstName]);

  const handleLastName = (value) => {
    setLastName(value.replace(/[^a-z, ]/gi, "").replace(/\s+/g, " "));
  };
  useEffect(() => {
    if (lastName.trim().length > 0) {
      setLastName(capitalize(lastName));
    }
  }, [lastName]);

  const handleUsername = (value) => {
    setUsername(value);
    setUsernameValid(!initialUsers.some((user) => user.username === value));
  };

  const handleEmail = (value) => {
    setEmail(value);
    setEmailValid(!initialUsers.some((user) => user.email === value));
  };

  const handlePassword = (value) => {
    setPassword(value);
    setPasswordValid(() => value.length > 7);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      usernameValid &&
      emailValid &&
      passwordValid &&
      (checked || !showCheckbox)
    ) {
      const updatedUsers = [
        ...users,
        {
          firstName,
          lastName,
          username,
          email,
          password,
          amount,
          status: "PENDING",
          accountNumber: "-"
        },
      ];
      setUsers(updatedUsers);
      localStorage.setItem("USERS", JSON.stringify(updatedUsers));
      if (watchSubmitEvent) handleSubmitEvent(true);
    }
  };

  return (
    <form className="SignUpForm" onSubmit={handleSubmit}>
      {showHeader && (
        <h3>{firstName.trim().length ? `Hello, ${firstName}!` : `Hello!`}</h3>
      )}
      <div className="form-control">
        <label>First Name</label>
        <input
          type="text"
          required
          maxLength="50"
          spellCheck="false"
          autoComplete="false"
          value={firstName}
          onChange={(e) => handleFirstName(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Last Name</label>
        <input
          type="text"
          required
          maxLength="50"
          spellCheck="false"
          autoComplete="false"
          value={lastName}
          onChange={(e) => handleLastName(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Username</label>
        <input
          type="text"
          required
          minLength="6"
          maxLength="20"
          spellCheck="false"
          autoComplete="false"
          value={username}
          onChange={(e) => handleUsername(e.target.value.trim())}
          className={usernameValid ? "" : "red-outline"}
        />
      </div>
      <div className="form-control">
        <label>Email</label>
        <input
          type="email"
          required
          minLength="3"
          maxLength="254"
          spellCheck="false"
          autoComplete="false"
          placeholder="name@domain.com"
          value={email}
          onChange={(e) => handleEmail(e.target.value.trim())}
          className={emailValid ? "" : "red-outline"}
        />
      </div>
      <div className="form-control">
        <label>Password</label>
        <input
          type="password"
          required
          spellCheck="false"
          autoComplete="false"
          placeholder="minimum of eight characters"
          value={password}
          onChange={(e) => handlePassword(e.target.value.trim())}
          className={passwordValid ? "" : "red-outline"}
        />
      </div>
      <div className="form-control">
        <label>Deposit amount</label>
        <input
          type="text"
          required
          spellCheck="false"
          autoComplete="false"
          value={amount}
          onChange={(e) => setAmount(e.target.value.replace(/\D/g, ""))}
        />
      </div>
      {showCheckbox && (
        <div className="form-control checkbox-container">
          <input
            type="checkbox"
            name="checkbox"
            className="checkbox"
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
          <label htmlFor="checkbox" className="checkbox-label">
            I agree to the <a className="terms-link">Terms and Conditions</a>
          </label>
        </div>
      )}
      <button type="submit" id="sign-up-button">
        {buttonText}
      </button>
    </form>
  );
};

export default SignUpForm;