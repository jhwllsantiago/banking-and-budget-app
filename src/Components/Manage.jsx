import { useState, useEffect } from "react";
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

  useEffect(() => {
    localStorage.setItem("USERS", JSON.stringify(users));
  }, [users]);

  const handleStatusChange = (idx, status) => {
    const [userToBeApproved] = users.filter((_, index) => index === idx);
    const allUsers = [...users];
    //const otherUsers = users.filter((_, index) => index !== idx);
    // setUsers([...otherUsers, { ...userToBeApproved, status }]);
    allUsers[idx] = { ...userToBeApproved, status };
    setUsers(allUsers);
  };
  const handleDelete = (idx) => {
    setUsers((users) => {
      return users.filter((_, index) => index !== idx);
    });
  };

  return (
    <div className="Manage">
      <ul>
        <div className="header-container">
          <h3>NAME</h3>
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
              <div className="balance">
                <p>{user.amount}</p>
              </div>
              <div className="status">
                <p>{user.status}</p>
              </div>
              <div className="actions">
                {user.status === "ACTIVE" && (
                  <>
                    <i>
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
                {/* {user.status === "ACTIVE" && (
                  <i onClick={() => handleStatusChange(idx, "INACTIVE")}>
                    <BiBlock />
                  </i>
                )}
                <i onClick={() => handleDelete(idx)}>
                  <RiDeleteBinLine />
                </i> */}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Manage;
