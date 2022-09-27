import { useNavigate } from "react-router-dom";

const SignupModal = ({ firstname }) => {
  const navigateToHome = useNavigate();
  const navigateToLogin = useNavigate();

  return (
    <div className="SignupModal">
      <p>Thank you {firstname} for using this app.</p>
      <p>Your request is under review.</p>
      <button onClick={() => navigateToHome("/")}>Home</button>
      <button onClick={() => navigateToLogin("/login")}>Login</button>
    </div>
  );
};

export default SignupModal;
