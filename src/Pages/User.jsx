import {
  Link,
  NavLink,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import PersonalTransactions from "../components/PersonalTransactions";
import MoneyTransfer from "../components/MoneyTransfer";
import Budget from "../components/Budget";
import "./User.scss";

//Icons//
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

  const loggedInUser = USERS.find((user) => user.username === LOGGED_IN.user);
  let TRANSACTIONS = [];
  if (loggedInUser && localStorage.getItem("TRANSACTIONS")) {
    TRANSACTIONS = JSON.parse(localStorage.getItem("TRANSACTIONS")).filter(
      (transaction) =>
        transaction.sender === loggedInUser.accountNumber ||
        transaction.recipient === loggedInUser.accountNumber
    );
  }

  const logoutUser = () => {
    navigate("/");
    localStorage.removeItem("LOGGED_IN");
  };

  if (!loggedInUser) {
    return <Navigate to="/login/client" replace />;
  }

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
        <div className="sign-out" onClick={logoutUser}>
          <p className="sign-out-text">Sign out</p>
          <VscSignOut className="sign-out-logo" />
        </div>
      </header>
      <Routes>
        <Route index element={<Budget user={loggedInUser} />} />
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
        <Route path="*" element={<Navigate to="/user" replace />} />
      </Routes>
    </div>
  );
};

export default User;
