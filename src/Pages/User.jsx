import { Link, NavLink, Routes, Route, useNavigate } from "react-router-dom";
import UserDashboard from "../components/UserDashboard";
import PersonalTransactions from "../components/PersonalTransactions";
import MoneyTransfer from "../components/MoneyTransfer";
import Budget from "../components/Budget";
import { useEffect } from "react";
import "./User.scss";

//Icons//
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineFileSync } from "react-icons/ai";
import { VscSignOut } from "react-icons/vsc";
import { GiMoneyStack } from "react-icons/gi";
import { MdSavings } from "react-icons/md";

const User = () => {
  const navigate = useNavigate();
  const USERS = localStorage.getItem("USERS")
    ? JSON.parse(localStorage.getItem("USERS"))
    : [];
  const LOGGED_IN = localStorage.getItem("LOGGED_IN")
    ? JSON.parse(localStorage.getItem("LOGGED_IN"))
    : {};
  //const LOGGED_IN.user = "jhowell";
  const loggedInUser = USERS.find((user) => user.username === LOGGED_IN.user);
  let TRANSACTIONS = [];
  if (loggedInUser && localStorage.getItem("TRANSACTIONS")) {
    TRANSACTIONS = JSON.parse(localStorage.getItem("TRANSACTIONS")).filter(
      (transaction) =>
        transaction.sender === loggedInUser.accountNumber ||
        transaction.recipient === loggedInUser.accountNumber
    );
  }
  useEffect(() => {
    if (!loggedInUser) navigate("/login/client");
  });

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
          <NavLink to="/user/budget">
            <p>
              <MdSavings className="logo" /> Budget
            </p>
          </NavLink>
          <NavLink to={`/user/transfer/${loggedInUser.accountNumber}`}>
            <p>
              <GiMoneyStack className="logo" /> Transfer
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
        <Route path="budget" element={<Budget user={loggedInUser} />} />
        <Route
          path="transfer/:accountNumber"
          element={
            <MoneyTransfer
              users={USERS}
              setUsers={() => {}}
              navigatePath="/user/transactions"
              showChannelSelect={true}
            />
          }
        />
        <Route
          path="transactions"
          element={
            <PersonalTransactions
              user={loggedInUser}
              transactions={TRANSACTIONS}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default User;
