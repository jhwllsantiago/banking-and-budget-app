import { Link, NavLink, Routes, Route } from "react-router-dom";
import UserDashboard from "../components/UserDashboard";
import PersonalTransactions from "../components/PersonalTransactions";
import "./User.scss";

//Icons//
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineFileSync } from "react-icons/ai";
import { VscSignOut } from "react-icons/vsc";
import { useState } from "react";

const User = () => {
  //   const USERS = localStorage.getItem("USERS")
  //     ? JSON.parse(localStorage.getItem("USERS"))
  //     : [];
  const data = {
    firstName: "Jhowell",
    lastName: "Santiago",
    username: "jhowell",
    email: "jho@san",
    password: "jhowellsantiago",
    balance: "1000",
    status: "ACTIVE",
    accountNumber: "4794812595",
  };
  const [user, setUser] = useState(data);
  let TRANSACTIONS = localStorage.getItem("TRANSACTIONS")
    ? JSON.parse(localStorage.getItem("TRANSACTIONS"))
    : [];
  TRANSACTIONS = TRANSACTIONS.filter(
    (transaction) =>
      transaction.sender === user.accountNumber ||
      transaction.recipient === user.accountNumber
  );
  const [transactions, setTransactions] = useState(TRANSACTIONS);

  return (
    <div className="user">
      <header className="user-header">
        <Link to="/user">
          <p className="centavi-logo" translate="no">
            centavi
          </p>
        </Link>
        <nav>
          <NavLink to="/user" end>
            <p>
              <MdOutlineDashboard className="logo" /> Dashboard
            </p>
          </NavLink>
          <NavLink to="/user/transactions">
            <p>
              <AiOutlineFileSync /> Transactions
            </p>
          </NavLink>
        </nav>
        <Link to="/" className="sign-out">
          <p className="sign-out-text">Sign out</p>
          <VscSignOut className="sign-out-logo" />
        </Link>
      </header>
      <Routes>
        <Route index element={<UserDashboard />} />
        <Route
          path="transactions"
          element={
            <PersonalTransactions user={user} transactions={transactions} />
          }
        />
      </Routes>
    </div>
  );
};

export default User;
