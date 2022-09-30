import { useParams, useNavigate } from "react-router-dom";
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

  const [firstName, setFirstName] = useState(user.firstName);
  const handleFirstName = (value) => {
    setFirstName(value.replace(/[^a-z, ]/gi, "").replace(/\s+/g, " "));
  };
  useEffect(() => {
    if (firstName.trim().length > 0) {
      setFirstName(capitalize(firstName));
    }
  }, [firstName]);

  const [lastName, setLastName] = useState(user.lastName);
  const handleLastName = (value) => {
    setLastName(value.replace(/[^a-z, ]/gi, "").replace(/\s+/g, " "));
  };
  useEffect(() => {
    if (lastName.trim().length > 0) {
      setLastName(capitalize(lastName));
    }
  }, [lastName]);

  const [username, setUsername] = useState(user.username);
  const [usernameValid, setUsernameValid] = useState(true);
  const handleUsername = (value) => {
    setUsername(value);
    setUsernameValid(!users.some((user) => user.username === value));
  };

  const [email, setEmail] = useState(user.email);
  const [emailValid, setEmailValid] = useState(true);
  const handleEmail = (value) => {
    setEmail(value);
    setEmailValid(!users.some((user) => user.email === value));
  };

  const [password, setPassword] = useState(user.password);
  const [passwordValid, setPasswordValid] = useState(true);
  const handlePassword = (value) => {
    setPassword(value);
    setPasswordValid(() => value.length > 7);
  };

  const handleButtonClick = () => {
    if (emailValid && passwordValid) {
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

  return (
    <div className="EditUserInfo">
      <h3>Account No. {accountNumber}</h3>
      <div>
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
      <div>
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
      <div>
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
      <div>
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
      <div>
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
      <button onClick={handleButtonClick}>Save</button>
      <button onClick={() => navigate("/admin/manage")}>Cancel</button>
    </div>
  );
};

export default EditUserInfo;
