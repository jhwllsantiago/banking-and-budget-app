import { Link } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  return (
    <header className="Header">
      <p>LOGO</p>
      <div className="links">
        <Link to="/user/signup">SIGN UP</Link>
        <Link to="/user/login">LOGIN</Link>
      </div>
    </header>
  );
};

export default Header;
