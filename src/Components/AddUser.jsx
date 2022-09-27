import { useState, useEffect } from "react";
import capitalize from "../Utility/capitalize.js";

const AddUser = () => {
  const USERS = localStorage.getItem("USERS");
  const initialUsers = USERS ? JSON.parse(USERS) : [];

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

  const handleUsername = (value) => {
    setUsername(value);
  };

  const handlePassword = (value) => {
    setPassword(value);
    setPasswordValid(() => value.length > 7);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsers((prev) => [
      ...prev,
      { firstname, lastname, username, password, amount },
    ]);
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
          onChange={(e) => handleUsername(e.target.value.trim())}
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
          onChange={(e) => handlePassword(e.target.value.replace(/ /g, ""))}
          className={passwordValid ? "" : "red-outline"}
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
      <button type="submit">Signup</button>
    </form>
  );
};

export default AddUser;
