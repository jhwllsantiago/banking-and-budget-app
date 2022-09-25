const Login = () => {
  const onSubmit = () => {};

  return (
    <div className="Login">
      <form onSubmit={onSubmit}>
        <h3>Hello!</h3>
        <label>Username:</label>
        <input type="text" required />
        <label>Password:</label>
        <input type="password" required />
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
