import { useNavigate, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Manage.scss";
import EditUserInfo from "../components/EditUserInfo";
import MoneyTransfer from "../components/MoneyTransfer";

//Icons//
import { BiBlock } from "react-icons/bi";
import { AiFillEdit } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import { GiConfirmed } from "react-icons/gi";
import { TbMoodEmpty } from "react-icons/tb";
import { FcMoneyTransfer } from "react-icons/fc";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import { RiVipCrownFill } from "react-icons/ri";
import { RiStarFill } from "react-icons/ri";

const Manage = ({ users, setUsers }) => {
  const navigate = useNavigate();
  const [balanceSort, setBalanceSort] = useState("none");

  const handleBalanceSort = () => {
    if (balanceSort === "none") {
      setBalanceSort("descending");
      users.sort((a, b) => parseFloat(b.balance) - parseFloat(a.balance));
    } else if (balanceSort === "descending") {
      setBalanceSort("ascending");
      users.sort((a, b) => parseFloat(a.balance) - parseFloat(b.balance));
    } else {
      setBalanceSort("none");
      users.sort((a, b) => a.id - b.id);
    }
  };
  useEffect(() => {
    setBalanceSort("none");
    users.sort((a, b) => a.id - b.id);
  }, [users]);

  const handleStatusChange = (id, status) => {
    let userToBeUpdated = users.find((user) => user.id === id);
    const userIndex = users.findIndex((user) => user.id === id);
    const allUsers = [...users];
    let accountNumber = "";
    if (userToBeUpdated.status === "PENDING") {
      for (let i = 0; i < 10; i++) {
        accountNumber += Math.floor(Math.random() * 10);
      }
      userToBeUpdated = { ...userToBeUpdated, accountNumber };
    }
    allUsers[userIndex] = { ...userToBeUpdated, status };
    setUsers(allUsers);
  };

  const handleDelete = (id) => {
    setUsers((users) => {
      return users.filter((user) => user.id !== id);
    });
  };

  const handleEdit = (accountNumber) => {
    navigate(`/admin/manage/user/${accountNumber}`);
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

        <ul className="users-list">
          {users.map((user) => {
            return (
              <li key={user.id}>
                <div className="name">
                  {parseFloat(user.balance) >= 1000000 &&
                    user.status === "ACTIVE" && <RiVipCrownFill />}
                  {user.firstName + " " + user.lastName ===
                    "Jhowell Santiago" && <RiStarFill />}
                  {user.firstName + " " + user.lastName ===
                    "Nicole Doromal" && <RiStarFill />}
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
                      <i
                        onClick={() => handleStatusChange(user.id, "INACTIVE")}
                      >
                        <BiBlock />
                      </i>
                    </>
                  )}
                  {user.status !== "ACTIVE" && (
                    <>
                      <i onClick={() => handleStatusChange(user.id, "ACTIVE")}>
                        <GiConfirmed />
                      </i>
                      <i onClick={() => handleDelete(user.id)}>
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
      <div className="no-users">
        {users.length === 0 && (
          <p>
            NO USERS FOUND <TbMoodEmpty />
          </p>
        )}
      </div>
      <Routes>
        <Route
          path="user/:accountNumber"
          element={<EditUserInfo users={users} setUsers={setUsers} />}
        />
        <Route
          path="transfer/user/:accountNumber"
          element={
            <MoneyTransfer
              users={users}
              setUsers={setUsers}
              navigatePath="/admin/manage"
              showChannelSelect={false} // eslint-disable-next-line
              style="money-transfer-container"
            />
          }
        />
        <Route
          path="user/:accountNumber/*"
          element={<Navigate to="/404" replace />}
        />
        <Route
          path="transfer/user/:accountNumber/*"
          element={<Navigate to="/404" replace />}
        />
      </Routes>
    </div>
  );
};

export default Manage;
