import { useNavigate } from "react-router-dom";
import "./LoginModal.scss";

const LoginModal = () => {
  const navigate = useNavigate();

  return (
    <div className="login-modal">
      <div
        className="login-client-button login-button"
        onClick={() => {
          navigate("/login/client");
        }}
      >
        CLIENT
      </div>
      <div
        className="login-admin-button login-button"
        onClick={() => navigate("/login/admin")}
      >
        ADMIN
      </div>
    </div>
  );
};

export default LoginModal;
