import "./Login.scss";
import Header from "../parts/Header";

const Login = () => {
  const onSubmit = () => {};

  return (
    <>
      <Header />
      <div className="login">
        <div className="login-container">
          <form onSubmit={onSubmit} className="login-form-container">
            <h2>Hello!</h2>
            <div className="input-container">
              <label>Username:</label>
              <input type="text" required />
            </div>
            <div className="input-container">
              <label>Password:</label>
              <input type="password" required />
            </div>
            <button>Login</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
