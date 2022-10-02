import { useNavigate } from "react-router-dom";
import "./LoginModal.scss";

const LoginModal = () => {
  const navigateToClientLogin = useNavigate();
  const navigateToAdminLogin = useNavigate();

  return (
    <div className="login-modal">
      {console.log("hello")}
      <div
        className="client-login-button login-button"
        onClick={() => {
          navigateToClientLogin("/login/client");
        }}
      >
        CLIENT
      </div>
      <div
        className="admin-login-button login-button"
        onClick={() => navigateToAdminLogin("/login/admin")}
      >
        ADMIN
      </div>
    </div>
  );
};

export default LoginModal;
