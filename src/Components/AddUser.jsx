import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SignUpForm from "./SignUpForm";

const AddUser = ({ users, setUsers }) => {
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (redirect) navigate("/admin/manage");
  });

  return (
    <div className="AddUser">
      {!redirect && (
        <div className="form-container">
          <SignUpForm
            users={users}
            setUsers={setUsers}
            buttonText="Confirm"
            watchSubmitEvent={true}
            handleSubmitEvent={(boolean) => setRedirect(boolean)}
          />
        </div>
      )}
    </div>
  );
};

export default AddUser;
