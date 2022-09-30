import { Link } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="centavi">centavi</Link>
      <div className="links">
        <Link to="/">HOME</Link>
        <Link to="/signup">SIGN UP</Link>
        <Link to="/login">LOGIN</Link>
      </div>
    </header>
  );
};

export default Header;
