import "./Body.scss";
import logo from '../Assets/images/centavi-logo.png';

const Body = () => {
  return (
    <div className="Body">
        <img src={ logo }  className="centavi-image" alt="centavi logo"></img>
      <p className="p-content">
      Securing your savings. <br></br> Down to the last centavi.
      </p>
    </div>
  );
};

export default Body;
