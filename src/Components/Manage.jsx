import { useNavigate } from "react-router-dom";
import "./Manage.scss";

//Icons//
import { BiBlock } from "react-icons/bi";
import { AiFillEdit } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import { GiConfirmed } from "react-icons/gi";
import { TbMoodEmpty } from "react-icons/tb";
import { FcMoneyTransfer } from "react-icons/fc";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";

const Manage = ({ users, setUsers }) => {
  const navigate = useNavigate();

  const handleStatusChange = (idx, status) => {
    let [userToBeUpdated] = users.filter((_, index) => index === idx);
    const allUsers = [...users];
    let accountNumber = "";
    if (userToBeUpdated.status === "PENDING") {
      for (let i = 0; i < 10; i++) {
        accountNumber += Math.floor(Math.random() * 10);
      }
      userToBeUpdated = { ...userToBeUpdated, accountNumber };
      console.log(accountNumber);
    }
    allUsers[idx] = { ...userToBeUpdated, status };
    setUsers(allUsers);
  };

  const handleDelete = (idx) => {
    setUsers((users) => {
      return users.filter((_, index) => index !== idx);
    });
  };

  const handleEdit = (accountNumber) => {
    navigate(`/admin/manage/user/${accountNumber}`);
  };

  let unsorted = useRef([...users]);
  useEffect(() => {
    unsorted.current = [...users];
  }, [users]);
  const [balanceSort, setBalanceSort] = useState("none");
  const handleBalanceSort = () => {
    if (balanceSort === "none") {
      setBalanceSort("descending");
      users.sort((a, b) => parseInt(b.balance) - parseInt(a.balance));
    } else if (balanceSort === "descending") {
      setBalanceSort("ascending");
      users.sort((a, b) => parseInt(a.balance) - parseInt(b.balance));
    } else {
      setBalanceSort("none");
      setUsers([...unsorted.current]);
    }
  };

  const handleTransfer = (accountNumber) => {
    navigate(`/admin/manage/transfer/user/${accountNumber}`);
  };

  return (
    <div className="manage">
      <div className="user-table">
        <div className="manage-header">
          <h3>NAME</h3>
          <h3>ACCOUNT NO.</h3>
          <h3>
            <i onClick={handleBalanceSort}>
              {balanceSort === "none" && <FaSort />}
              {balanceSort === "descending" && <FaSortDown />}
              {balanceSort === "ascending" && <FaSortUp />}
            </i>{" "}
            BALANCE
          </h3>
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
        <ul className="users-list">
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
                  <p>{user.balance}</p>
                </div>
                <div className="status">
                  <p>{user.status}</p>
                </div>
                <div className="actions">
                  {user.status === "ACTIVE" && (
                    <>
                      <i onClick={() => handleTransfer(user.accountNumber)}>
                        <FcMoneyTransfer />
                      </i>
                      <i onClick={() => handleEdit(user.accountNumber)}>
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
    </div>
  );
};

export default Manage;
