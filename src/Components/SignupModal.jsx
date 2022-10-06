import { useNavigate } from "react-router-dom";
import "./SignUpModal.scss";

const SignUpModal = () => {
  const [USER] = JSON.parse(localStorage.getItem("USERS")).slice(-1);
  const navigateToHome = useNavigate();
  const navigateToLogin = useNavigate();

  return (
    <div className="SignupModal">
      <div className="sign-up-modal-container">
        <p>Thank you {USER.firstName} for using this app.</p>
        <p>Your request is under review.</p>
        <div className="sign-up-modal-buttons-container">
          <button onClick={() => navigateToHome("/")}>Home</button>
          <button onClick={() => navigateToLogin("/login/client")}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;
