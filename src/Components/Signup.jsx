import { useState } from "react";
import SignUpModal from "./SignUpModal";
import SignUpForm from "./SignUpForm";

const SignUp = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && <SignUpModal />}
      <SignUpForm
        showHeader={true}
        showCheckbox={true}
        buttonText="Sign Up"
        watchSubmitEvent={true}
        handleSubmitEvent={(boolean) => setShowModal(boolean)}
      />
    </>
  );
};

export default SignUp;
