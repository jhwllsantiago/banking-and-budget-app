import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import capitalize from "../Utility/capitalize";
import "./EditUserInfo.scss";

const EditUserInfo = () => {
  let navigate = useNavigate();
  const { accountNumber } = useParams();
  const USERS = JSON.parse(localStorage.getItem("USERS"));
  let user = USERS.find((user) => user.accountNumber === accountNumber);
  let userIndex = USERS.findIndex(
    (user) => user.accountNumber === accountNumber
  );

  const [lastName, setLastName] = useState(user.lastName);
  const handleLastName = (value) => {
    setLastName(value.replace(/[^a-z, ]/gi, "").replace(/\s+/g, " "));
  };
  useEffect(() => {
    if (lastName.trim().length > 0) {
      setLastName(capitalize(lastName));
    }
  }, [lastName]);

  const [email, setEmail] = useState(user.email);
  const [emailValid, setEmailValid] = useState(true);
  const handleEmail = (value) => {
    setEmail(value);
    setEmailValid(!USERS.some((user) => user.email === value));
  };

  const [password, setPassword] = useState(user.password);
  const [passwordValid, setPasswordValid] = useState(true);
  const handlePassword = (value) => {
    setPassword(value);
    setPasswordValid(() => value.length > 7);
  };

  const handleButtonClick = () => {
    if (emailValid && passwordValid) {
      USERS[userIndex] = { ...user, lastName, email, password };
      localStorage.setItem("USERS", JSON.stringify(USERS));
      navigate("/admin/manage");
    }
  };

  return (
    <div className="EditUserInfo">
      <h3>Account No. {accountNumber}</h3>
      <div>
        <label>First Name</label>
        <input type="text" disabled value={user.firstName} />
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
        <input type="text" disabled value={user.username} />
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
    </div>
  );
};

export default EditUserInfo;
