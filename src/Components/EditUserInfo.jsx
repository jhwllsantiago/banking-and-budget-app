import { useParams } from "react-router-dom";
import "./EditUserInfo.scss";

const EditUserInfo = () => {
  const { id } = useParams();
  const USERS = localStorage.getItem("USERS");
  const user = USERS ? JSON.parse(USERS)[id] : [{}];

  return (
    <div className="EditUserInfo">
      <h1>edit user info {id}</h1>
      <p>{user.firstName}</p>
      <p>{user.lastName}</p>
      <button>Save</button>
    </div>
  );
};

export default EditUserInfo;
