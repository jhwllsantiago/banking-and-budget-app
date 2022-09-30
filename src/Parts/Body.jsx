import "./Body.scss";
import logo from '../assets/images/centavi-logo.png';

const Body = () => {
  return (
    <div className="body">
        <img src={ logo }  className="centavi-image" alt="centavi logo"></img>
      <p className="p-content">
      Securing your savings. <br /> Down to the last centavi.
      </p>
    </div>
  );
};

export default Body;
