import { useNavigate } from "react-router-dom";

const SignupModal = () => {
  const [USER] = JSON.parse(localStorage.getItem("USERS")).slice(-1);
  const navigateToHome = useNavigate();
  const navigateToLogin = useNavigate();

  return (
    <div className="SignupModal">
      <p>Thank you {USER.firstName} for using this app.</p>
      <p>Your request is under review.</p>
      <button onClick={() => navigateToHome("/")}>Home</button>
      <button onClick={() => navigateToLogin("/login")}>Login</button>
    </div>
  );
};

export default SignupModal;
