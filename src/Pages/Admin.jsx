import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Admin.scss";

import GlobalTransactions from "../components/GlobalTransactions";
import Dashboard from "../components/Dashboard";
import Manage from "../components/Manage";
import AddUser from "../components/AddUser";
import EditUserInfo from "../components/EditUserInfo";
import MoneyTransfer from "../components/MoneyTransfer";

//Icons//
import { MdOutlineDashboard } from "react-icons/md";
import { FaListUl } from "react-icons/fa";
import { AiOutlineUserAdd } from "react-icons/ai";
import { GrTransaction } from "react-icons/gr";
import { VscSignOut } from "react-icons/vsc";

const Admin = () => {
  const USERS = localStorage.getItem("USERS");
  const initialUsers = USERS ? JSON.parse(USERS) : [];
  const [users, setUsers] = useState(initialUsers);
  useEffect(() => {
    localStorage.setItem("USERS", JSON.stringify(users));
  }, [users]);

  return (
    <div className="admin">
      <header className="admin-header">
        <Link to="/admin">
          <p className="centavi-logo">centavi</p>
        </Link>
        <nav>
          <Link to="/admin/dashboard">
            <p>
              <MdOutlineDashboard className="logo" /> Dashboard
            </p>
          </Link>
          <Link to="/admin/manage">
            <p>
              <FaListUl className="logo" /> Manage Users
            </p>
          </Link>
          <Link to="/admin/add">
            <p>
              <AiOutlineUserAdd className="logo" /> Add User
            </p>
          </Link>
        <Link to="/admin/transactions">
          <p>
            <GrTransaction /> Transactions
          </p>
        </Link>
        </nav>
        <div className="sign-out">
          <p className="sign-out-text">Sign out</p>
          <VscSignOut className="sign-out-logo" />
        </div>
      </header>
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route
          path="manage"
          element={<Manage users={users} setUsers={setUsers} />}
        />
        <Route
          path="manage/user/:accountNumber"
          element={
            <>
              <Manage users={users} setUsers={setUsers} />
              <EditUserInfo users={users} setUsers={setUsers} />
            </>
          }
        />
        <Route
          path="manage/transfer/user/:accountNumber"
          element={
            <>
              <Manage users={users} setUsers={setUsers} />
              <MoneyTransfer users={users} setUsers={setUsers} />
            </>
          }
        />
        <Route
          path="add"
          element={<AddUser users={users} setUsers={setUsers} />}
        />
        <Route path="transactions" element={<GlobalTransactions />} />
      </Routes>
    </div>
  );
};

export default Admin;
