import { Link } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  return (
    <header className="Header">
      <p className="centavi">centavi</p>
      <div className="links">
        <Link to="/">HOME</Link>
        <Link to="/signup">SIGN UP</Link>
        <Link to="/login">LOGIN</Link>
      </div>
    </header>
  );
};

export default Header;
