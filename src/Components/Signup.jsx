import { useState } from "react";
import SignUpModal from "./SignUpModal";
import SignUpForm from "./SignUpForm";
import Header from "../Parts/Header";

const SignUp = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
    <Header />
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
