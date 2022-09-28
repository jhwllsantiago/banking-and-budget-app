import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SignUpForm from "./SignUpForm";

const AddUser = () => {
  const [redirect, setRedirect] = useState(false);
  const [color, setColor] = useState("red");
  const navigate = useNavigate();

  useEffect(() => {
    if (redirect) navigate("/admin/manage");
  }, [redirect]);

  return (
    <div className="AddUser">
      {!redirect && (
        <div className="form-container">
          <p style={{ textAlign: "center", color: `${color}` }}>{color}</p>
          <button onClick={() => setColor("blue")}>sadsad</button>
          <SignUpForm
            buttonText="Update"
            watchSubmitEvent={true}
            handleSubmitEvent={(boolean) => setRedirect(boolean)}
          />
        </div>
      )}
    </div>
  );
};

export default AddUser;
<div className="AddUser">
  <div className="form-container">
    <SignUpForm />
  </div>
</div>;
