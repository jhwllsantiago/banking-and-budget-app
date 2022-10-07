import { useState } from "react";
import { Link } from "react-router-dom";
import LoginModal from "../components/LoginModal";
import "./Header.scss";

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeButton, setActiveButton] = useState(false);

  return (
    <header className="header">
      <Link to="/" className="centavi" translate="no">
        centavi
      </Link>
      <nav className="nav">
        <Link className="header-links" to="/">
          HOME
        </Link>
        <Link className="header-links" to="/signup">
          SIGN UP
        </Link>
        <span
          onClick={() => {
            setShowModal(!showModal);
            setActiveButton(!activeButton);
          }}
          className={"header-links " + (activeButton ? "active" : "")}
        >
          LOGIN
        </span>
        {showModal && <LoginModal />}
      </nav>
    </header>
  );
};

export default Header;
