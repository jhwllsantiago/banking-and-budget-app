import "./Signup.scss";

const Signup = () => {
  const onSubmit = () => {};

  return (
    <div className="Signup">
      <form onSubmit={onSubmit}>
        <h3>Hello!</h3>
        <label>Username:</label>
        <input type="text" required />
        <label>Password:</label>
        <input type="password" required />
        <label>Choose a Plan</label>
        <select>
          <option value="1">Regular</option>
          <option value="2">Premium</option>
          <option value="3">VIP</option>
        </select>
        <label>Deposit amount</label>
        <input type="number" />
        <input type="checkbox" name="box" />
        <label htmlFor="box">
          I agree to the Terms and Conditions
        </label>
        <button>Signup</button>
      </form>
    </div>
  );
};

export default Signup;
