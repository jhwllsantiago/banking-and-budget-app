import "./Body.scss";
import logo from "../assets/images/centavi-logo-transparent.PNG";

const Body = () => {
  return (
    <div className="body">
      <div className="centavi-logo-container">
        <div className="centavi-logo-background"></div>
        <img src={logo} className="centavi-image" alt="centavi logo"></img>
      </div>
      <p className="p-content">
        Securing your savings. <br /> Down to the last centavi.
      </p>
    </div>
  );
};

export default Body;
