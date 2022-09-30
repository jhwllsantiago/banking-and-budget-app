import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SignUpForm from "./SignUpForm";

const AddUser = () => {
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (redirect) navigate("/admin/manage");
  }, [redirect]);

  return (
    <div className="AddUser">
      {!redirect && (
        <div className="form-container">
          <SignUpForm
            form="add-user-form"
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
