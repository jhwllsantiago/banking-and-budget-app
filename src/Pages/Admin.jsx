import { Routes, Route, Link } from "react-router-dom";
import "./Admin.scss";
import Configure from "../Components/Configure";
import Dashboard from "../Components/Dashboard";
import Manage from "../Components/Manage";
import AddUser from "../Components/AddUser";
import EditUserInfo from "../Components/EditUserInfo";

//Icons//
import { MdOutlineDashboard } from "react-icons/md";
import { FaListUl } from "react-icons/fa";
import { AiOutlineUserAdd } from "react-icons/ai";
import { GrConfigure } from "react-icons/gr";

const Admin = () => {
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
        <Route path="manage" element={<Manage />} />
        <Route
          path="manage/user/:id"
          element={
            <>
              <Manage />
              <EditUserInfo />
            </>
          }
        />
        <Route path="add" element={<AddUser />} />
        <Route path="configure" element={<Configure />} />
      </Routes>
    </div>
  );
};

export default Admin;
