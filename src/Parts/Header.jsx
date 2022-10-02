import { useState } from "react";
import { Link } from "react-router-dom";
import LoginModal from "../components/LoginModal";
import "./Header.scss";

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeButton, setActiveButton] =useState(false)

  return (
    <header className="header">
      <Link to="/" className="centavi" translate="no">
        centavi
      </Link>
      <div className="links">
        <Link className="header-links" to="/">
          HOME
        </Link>
        <Link className="header-links" to="/signup">
          SIGN UP
        </Link>
        <span
          className="header-links"
          onClick={() => {
            if (showModal === false) {
              setShowModal(true);
              setActiveButton(true);
            } else {
              setShowModal(false);
              setActiveButton(false)
            }
          }}
        // className= {activeButton ? "login-active" : ""}
        >
          LOGIN
        </span>
        {showModal && <LoginModal />};
      </div>
    </header>
  );
};

export default Header;
