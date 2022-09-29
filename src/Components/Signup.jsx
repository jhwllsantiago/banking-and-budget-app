import { useState, useEffect } from "react";
import SignUpModal from "./SignUpModal";
import SignUpForm from "./SignUpForm";
import Header from "../Parts/Header";

const SignUp = () => {
  const [showModal, setShowModal] = useState(false);
  const USERS = localStorage.getItem("USERS");
  const initialUsers = USERS ? JSON.parse(USERS) : [];
  const [users, setUsers] = useState(initialUsers);
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
