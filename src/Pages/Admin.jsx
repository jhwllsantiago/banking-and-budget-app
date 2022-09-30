import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Admin.scss";
import Configure from "../Components/Configure";
import Dashboard from "../Components/Dashboard";
import Manage from "../Components/Manage";
import AddUser from "../Components/AddUser";
import EditUserInfo from "../Components/EditUserInfo";
import MoneyTransfer from "../Components/MoneyTransfer";

//Icons//
import { MdOutlineDashboard } from "react-icons/md";
import { FaListUl } from "react-icons/fa";
import { AiOutlineUserAdd } from "react-icons/ai";
import { GrConfigure } from "react-icons/gr";

const Admin = () => {
  const USERS = localStorage.getItem("USERS");
  const initialUsers = USERS ? JSON.parse(USERS) : [];
  const [users, setUsers] = useState(initialUsers);
  useEffect(() => {
    localStorage.setItem("USERS", JSON.stringify(users));
  }, [users]);

  return (
    <div className="Admin">
      <nav>
        <Link to="/admin/dashboard">
          <p>
            <MdOutlineDashboard /> Dashboard
          </p>
        </Link>
        <Link to="/admin/manage">
          <p>
            <FaListUl /> Manage Users
          </p>
        </Link>
        <Link to="/admin/add">
          <p>
            <AiOutlineUserAdd /> Add User
          </p>
        </Link>
        <Link to="/admin/configure">
          <p>
            <GrConfigure /> Configure
          </p>
        </Link>
      </nav>
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
        <Route path="configure" element={<Configure />} />
      </Routes>
    </div>
  );
};

export default Admin;
