import { Routes, Route, Link } from "react-router-dom";
import "./Admin.scss";
import Configure from "../components/Configure";
import Dashboard from "../components/Dashboard";
import Manage from "../components/Manage";
import AddUser from "../components/AddUser";

//Icons//
import { MdOutlineDashboard } from "react-icons/md";
import { FaListUl } from "react-icons/fa";
import { AiOutlineUserAdd } from "react-icons/ai";
import { AiOutlineTool } from "react-icons/ai";
import { VscSignOut } from "react-icons/vsc";

const Admin = () => {
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
          <Link to="/admin/configure">
            <p>
              <AiOutlineTool className="logo" /> Configure
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
        <Route path="manage" element={<Manage />} />
        <Route path="add" element={<AddUser />} />
        <Route path="configure" element={<Configure />} />
      </Routes>
    </div>
  );
};

export default Admin;
