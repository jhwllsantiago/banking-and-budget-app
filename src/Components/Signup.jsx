import { useState, useEffect } from "react";
import SignUpModal from "./SignUpModal";
import SignUpForm from "./SignUpForm";
import Header from "../parts/Header";

const SignUp = () => {
  const [showModal, setShowModal] = useState(false);
  const USERS = localStorage.getItem("USERS")
    ? JSON.parse(localStorage.getItem("USERS"))
    : [];
  const [users, setUsers] = useState(USERS);
  useEffect(() => {
    localStorage.setItem("USERS", JSON.stringify(users));
  }, [users]);

  return (
    <>
      <Header />
      {showModal && <SignUpModal />}
      <SignUpForm
        users={users}
        setUsers={setUsers}
        form="sign-up-form"
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
