import { useNavigate } from "react-router-dom";

const LoginModal = () => {
  const navigateToClientLogin = useNavigate();
  const navigateToAdminLogin = useNavigate();

  return (
    <div className="login-modal">
      {console.log("hello")}
      <div
        className="client-login-button"
        onClick={() => {
          navigateToClientLogin("/login/client");
        }}
      >
        Client
      </div>
      <div
        className="admin-login-button"
        onClick={() => navigateToAdminLogin("/login/admin")}
      >
        Admin
      </div>
    </div>
  );
};

export default LoginModal;
