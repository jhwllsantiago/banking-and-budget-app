import { Routes, Route, Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Admin.scss";

import GlobalTransactions from "../components/GlobalTransactions";
import Dashboard from "../components/Dashboard";
import Manage from "../components/Manage";
import AddUser from "../components/AddUser";

//Icons//
import { MdOutlineDashboard } from "react-icons/md";
import { FaListUl } from "react-icons/fa";
import { AiOutlineUserAdd } from "react-icons/ai";
import { AiOutlineFileSync } from "react-icons/ai";
import { VscSignOut } from "react-icons/vsc";

const Admin = () => {
  const navigate = useNavigate();
  const USERS = localStorage.getItem("USERS")
    ? JSON.parse(localStorage.getItem("USERS"))
    : [];
  const LOGGED_IN = localStorage.getItem("LOGGED_IN")
    ? JSON.parse(localStorage.getItem("LOGGED_IN"))
    : {};
  const ADMINS = localStorage.getItem("ADMINS")
    ? JSON.parse(localStorage.getItem("ADMINS"))
    : [];
  const loggedInAdmin = ADMINS.find(
    (admin) => admin.username === LOGGED_IN.user
  );
  const [users, setUsers] = useState(USERS);

  useEffect(() => {
    localStorage.setItem("USERS", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (!loggedInAdmin) navigate("/login/admin");
  });

  const logoutAdmin = () => {
    console.log("working now");
    navigate("/");
    localStorage.removeItem("LOGGED_IN");
  };

  return (
    <div className="admin">
      <header className="admin-header">
        <Link to="/admin">
          <p className="centavi-logo" translate="no">
            centavi
          </p>
        </Link>
        <nav>
          <NavLink to="/admin" end>
            <p>
              <MdOutlineDashboard className="logo" /> Dashboard
            </p>
          </NavLink>
          <NavLink to="/admin/manage">
            <p>
              <FaListUl className="logo" /> Manage Users
            </p>
          </NavLink>
          <NavLink to="/admin/add">
            <p>
              <AiOutlineUserAdd className="logo" /> Add User
            </p>
          </NavLink>
          <NavLink to="/admin/transactions">
            <p>
              <AiOutlineFileSync /> Transactions
            </p>
          </NavLink>
        </nav>
        <div className="sign-out" onClick={logoutAdmin}>
          <p className="sign-out-text">Sign out</p>
          <VscSignOut className="sign-out-logo" />
        </div>
      </header>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route
          path="manage/*"
          element={<Manage users={users} setUsers={setUsers} />}
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
