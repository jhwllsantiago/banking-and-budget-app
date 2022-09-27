import { useState } from "react";
import "./Signup.scss";
import SignupModal from "./SignupModal";
import AddUserForm from "./SignupForm";

const Signup = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && <SignupModal />}
      <AddUserForm handleSubmitEvent={(boolean) => setShowModal(boolean)} />
    </>
  );
};

export default Signup;
