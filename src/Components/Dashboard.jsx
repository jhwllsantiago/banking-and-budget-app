import "./Dashboard.scss";
import { useState } from "react";
import { Chart } from "react-google-charts";

//Icons//
import { RiVipCrownFill } from "react-icons/ri";

const Dashboard = () => {
  const USERS = JSON.parse(localStorage.getItem("USERS"));
  const savedUsers = [...USERS];

  const activeUsersData = [["Client", "Balance"]];
  let activeUsersBalance = 0;
  let pendingRequests = 0;
  const vipClients = [];

  savedUsers.forEach((user) => {
    const { ...users } = user;
    const { firstName, lastName, balance, status } = users;
    if (status === "ACTIVE") {
      const activeUserArray = [lastName, parseFloat(balance)];
      activeUsersData.push(activeUserArray);
      activeUsersBalance += parseFloat(balance);
    }

    if (status === "PENDING") {
      pendingRequests += 1;
    }
  });

  console.log("dataaa", activeUsersData);

  const options = {
    pieHole: 0.5,
    is3D: false,
    backgroundColor: "#e3e3e3",
  };

  return (
    <div className="dashboard">
      <div className="dashboard-graph active-users-graph">
        <h3>Active Users</h3>
        <Chart chartType="PieChart" data={activeUsersData} options={options} />
        <p className="active-users-text">
          <span>{activeUsersData.length - 1}</span> active users with <br />
          <span>₱{activeUsersBalance}</span> total balance.
        </p>
      </div>
      <div className="dashboard-graph graph-2">
        <h3>Graph 2</h3>
      </div>
      <div className="dashboard-graph graph-3">
        <h3>Graph 3</h3>
      </div>
      <div className="dashboard-graph vip-graph">
        <h3>
          <RiVipCrownFill /> VIP
        </h3>
        <ul className="vip-list">
          {savedUsers.map((user, idx) => {
            const { ...users } = user;
            const { firstName, lastName } = users;
            if (user.balance >= 1000000) {
              return (
                <li key={idx}>
                  {" "}
                  {lastName}, {firstName} 
                </li>
              );
            }
          })}
        </ul>
        <p> {vipClients}</p>
      </div>
      <div className="dashboard-graph pending-graph">
        <h3>Pending</h3>
        {pendingRequests > 0 && (
          <div>
            <span className="pending-number">{pendingRequests}</span>
            <br></br>
            <span className="activation-text">
              activation {pendingRequests === 1 ? "request" : "requests"}
            </span>{" "}
          </div>
        )}{" "}
        {pendingRequests === 0 && <p className="no-requests-text">No activation requests.</p>}
      </div>
    </div>
  );
};

export default Dashboard;
