import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import capitalize from "../utility/capitalize";
import "./EditUserInfo.scss";

const EditUserInfo = ({ users, setUsers }) => {
  let navigate = useNavigate();
  const { accountNumber } = useParams();
  let user = users.find((user) => user.accountNumber === accountNumber);
  let userIndex = users.findIndex(
    (user) => user.accountNumber === accountNumber
  );
  if (!user) user = { redirect: true }; //prevent errors //used for redirect

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [username, setUsername] = useState(user.username);
  const [usernameValid, setUsernameValid] = useState(true);
  const [email, setEmail] = useState(user.email);
  const [emailValid, setEmailValid] = useState(true);
  const [password, setPassword] = useState(user.password);
  const [passwordValid, setPasswordValid] = useState(true);

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
    const checker = users.some((user) => user.username === value);
    setUsernameValid(!checker || user.username === value);
  };

  const handleEmail = (value) => {
    setEmail(value);
    const checker = users.some((user) => user.email === value);
    setEmailValid(!checker || user.email === value);
  };

  const handlePassword = (value) => {
    setPassword(value);
    setPasswordValid(() => value.length > 7);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (usernameValid && emailValid && passwordValid) {
      let currentUsers = [...users];
      currentUsers[userIndex] = {
        ...user,
        firstName,
        lastName,
        username,
        email,
        password,
      };
      localStorage.setItem("USERS", JSON.stringify(currentUsers));
      setUsers(currentUsers);
      navigate("/admin/manage");
    }
  };
  if (user.redirect) return <Navigate to="/admin/manage" replace />;
  return (
    <div className="edit-user-info-container">
      <form onSubmit={handleSubmit} className="edit-user-info">
        <h3>Account No. {accountNumber}</h3>
        <div className="first-name-container details-container">
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
        <div className="last-name-container details-container">
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
        <div className="username-container details-container">
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
        <div className="email-container details-container">
          <label>Email</label>
          <input
            type="email"
            required
            minLength="3"
            maxLength="254"
            spellCheck="false"
            autoComplete="false"
            value={email}
            onChange={(e) => handleEmail(e.target.value.trim())}
            className={emailValid ? "" : "red-outline"}
          />
        </div>
        <div className="password-container details-container">
          <label>Password</label>
          <input
            type="text"
            required
            maxLength="50"
            spellCheck="false"
            autoComplete="false"
            placeholder="minimum of eight characters"
            value={password}
            onChange={(e) => handlePassword(e.target.value.trim())}
            className={passwordValid ? "" : "red-outline"}
          />
        </div>
        <button className="save-button">Save</button>
        <button
          onClick={() => navigate("/admin/manage")}
          className="cancel-button"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditUserInfo;
