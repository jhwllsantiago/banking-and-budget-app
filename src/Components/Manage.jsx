import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Manage.scss";

//Icons//
import { BiBlock } from "react-icons/bi";
import { AiFillEdit } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import { GiConfirmed } from "react-icons/gi";
import { TbMoodEmpty } from "react-icons/tb";

const Manage = () => {
  const USERS = localStorage.getItem("USERS");
  const initialUsers = USERS ? JSON.parse(USERS) : [];
  const [users, setUsers] = useState(initialUsers);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("USERS", JSON.stringify(users));
  }, [users]);

  const handleStatusChange = (idx, status) => {
    let [userToBeUpdated] = users.filter((_, index) => index === idx);
    const allUsers = [...users];
    allUsers[idx] = { ...userToBeApproved, status };
    setUsers(allUsers);
  };
  const handleDelete = (idx) => {
    setUsers((users) => {
      return users.filter((_, index) => index !== idx);
    });
  };

  const handleEdit = (idx) => {
    navigate(`/admin/manage/user/${idx}`);
  };

  return (
    <div className="Manage">
      <ul>
        <div className="header-container">
          <h3>NAME</h3>
          <h3>ACCOUNT NO.</h3>
          <h3>BALANCE</h3>
          <h3>STATUS</h3>
          <h3>ACTIONS</h3>
        </div>

        <div className="no-users">
          {users.length === 0 && (
            <p>
              NO USERS FOUND <TbMoodEmpty />
            </p>
          )}
        </div>

        {users.map((user, idx) => {
          return (
            <li key={idx}>
              <div className="name">
                <p>
                  {user.firstName} {user.lastName}
                </p>
              </div>
              <div className="accountNumber">
                <p>{user.accountNumber}</p>
              </div>
              <div className="balance">
                <p>{user.amount}</p>
              </div>
              <div className="status">
                <p>{user.status}</p>
              </div>
              <div className="actions">
                {user.status === "ACTIVE" && (
                  <>
                    <i onClick={() => handleEdit(idx)}>
                      <AiFillEdit />
                    </i>
                    <i onClick={() => handleStatusChange(idx, "INACTIVE")}>
                      <BiBlock />
                    </i>
                  </>
                )}
                {user.status !== "ACTIVE" && (
                  <>
                    <i onClick={() => handleStatusChange(idx, "ACTIVE")}>
                      <GiConfirmed />
                    </i>
                    <i onClick={() => handleDelete(idx)}>
                      <RiDeleteBinLine />
                    </i>
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Manage;
