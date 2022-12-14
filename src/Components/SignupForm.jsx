import { useState, useEffect } from "react";
import capitalize from "../utility/capitalize.js";
import "./SignUpForm.scss";
import toTwoDecimal from "../utility/toTwoDecimal.js";

const SignUpForm = ({
  handleSubmitEvent,
  watchSubmitEvent,
  showHeader,
  showCheckbox,
  buttonText,
  users,
  setUsers,
  form,
}) => {
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
    value = value.trimStart();
    setFirstName(value.replace(/[^a-z, ]/gi, "").replace(/\s+/g, " "));
  };
  useEffect(() => {
    if (firstName) setFirstName(capitalize(firstName));
  }, [firstName]);

  const handleLastName = (value) => {
    value = value.trimStart();
    setLastName(value.replace(/[^a-z, ]/gi, "").replace(/\s+/g, " "));
  };
  useEffect(() => {
    if (lastName) setLastName(capitalize(lastName));
  }, [lastName]);

  const handleUsername = (value) => {
    setUsername(value);
    setUsernameValid(!users.some((user) => user.username === value));
  };

  const handleEmail = (value) => {
    setEmail(value);
    setEmailValid(!users.some((user) => user.email === value));
  };

  const handlePassword = (value) => {
    setPassword(value);
    setPasswordValid(() => value.length > 7);
  };

  const handleDeposit = (value) => {
    value = toTwoDecimal(value);
    setAmount(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      usernameValid &&
      emailValid &&
      passwordValid &&
      amount !== "." &&
      (checked || !showCheckbox)
    ) {
      const updatedUsers = [
        ...users,
        {
          id: new Date().getTime(),
          firstName,
          lastName,
          username,
          email,
          password,
          balance: parseFloat(amount).toFixed(2),
          status: "PENDING",
          accountNumber: "-",
        },
      ];
      setUsers(updatedUsers);
      localStorage.setItem("USERS", JSON.stringify(updatedUsers));
      if (watchSubmitEvent) handleSubmitEvent(true);
    }
  };

  return (
    <div className="signUpContainer">
      <form className={form} onSubmit={handleSubmit}>
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
            placeholder="Juan"
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
            placeholder="Dela Cruz"
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
            placeholder="user_name"
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
            placeholder="minimum of 8 characters"
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
            placeholder="000.00"
            maxLength="9"
            value={amount}
            onChange={(e) =>
              handleDeposit(
                e.target.value
                  .replace(/[^0-9.]/g, "")
                  .replace(/(\..*?)\..*/g, "$1")
              )
            }
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
              I agree to the{" "}
              <a href="/" target={"_blank"} className="terms-link">
                Terms and Conditions
              </a>
            </label>
          </div>
        )}
        <button type="submit" className="sign-up-button">
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
