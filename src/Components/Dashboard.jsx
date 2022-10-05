import "./Dashboard.scss";
import { useState } from "react";
import { Chart } from "react-google-charts";

//Icons//
import { RiVipCrownFill } from "react-icons/ri";

const Dashboard = () => {
  const USERS = JSON.parse(localStorage.getItem("USERS"));
  const savedUsers = [...USERS];

  const TRANSACTIONS = JSON.parse(localStorage.getItem("TRANSACTIONS"));
  const transactionsHistory = [...TRANSACTIONS];

  const activeUsersData = [["Client", "Balance"]];

  let activeUsersBalance = 0;
  let pendingRequests = 0;
  const vipClients = [];

  const activeUsersDataOptions = {
    legend: "none",
    pieSliceText: "none",
    pieHole: 0.5,
    is3D: false,
    backgroundColor: "#e3e3e3",
  };

  let vipShares = 0;
  let notVipShares = 0;

  const vipSharesGraphOptions = {
    legend: "none",
    pieSliceText: "VIP",
    pieStartAngle: 135,
    tooltip: { trigger: "none" },
    slices: {
      0: { color: "brown" },
      1: { color: "white" },
    },
    backgroundColor: "transparent",
    allowHtml: true,
    cssClassNames: {},
  };

  savedUsers.forEach((user) => {
    const { ...users } = user;
    const { firstName, lastName, balance, status } = users;
    const fullName = `${firstName} ${lastName}`;

    if (status === "ACTIVE") {
      const activeUserArray = [fullName, parseFloat(balance)];
      activeUsersData.push(activeUserArray);
      activeUsersBalance += parseFloat(balance);
    }

    if (status === "PENDING") {
      pendingRequests += 1;
    }

    if (parseFloat(balance) >= 1000000) {
      vipShares += parseFloat(balance);
    } else {
      notVipShares += parseFloat(balance);
    }
  });

  let vipSharesPercentage = (vipShares / (vipShares + notVipShares)) * 100;
  let notVipSharesPercentage =
    (notVipShares / (vipShares + notVipShares)) * 100;

  const vipSharesData = [
    ["VIP Shares", "Percentage"],
    ["VIP", vipSharesPercentage],
    ["Not VIP", notVipSharesPercentage],
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-graph active-users-graph">
        <h3>Active Users</h3>
        <div className="active-users-pie-chart">
          <Chart
            chartType="PieChart"
            data={activeUsersData}
            options={activeUsersDataOptions}
          />
        </div>
        <p className="active-users-text">
          <span>{activeUsersData.length - 1}</span> active users with
          <span> ₱{activeUsersBalance}</span> total balance.
        </p>
      </div>
      <div className="dashboard-graph vip-shares-graph">
        <h3>VIP Shares</h3>
        <div className="vip-shares-pie-chart">
          <Chart
            chartType="PieChart"
            data={vipSharesData}
            options={vipSharesGraphOptions}
          />
        </div>
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
        {pendingRequests === 0 && (
          <p className="no-requests-text">No activation requests.</p>
        )}
      </div>
      <div className="dashboard-graph transactions-graph">
        <h3>Transactions</h3>
        <div className="transactions-text-container">
          <span className="transactions-number">{transactionsHistory.length}</span><br></br>
            <span className="transactions-span">
              total successful transactions.
            </span>{" "}
        </div>
      </div>
      <div className="dashboard-graph vip-graph">
        <h3>
          <RiVipCrownFill /> VIP
        </h3>
        <ul className="vip-list">
          {savedUsers.map((user, idx) => {
            const { firstName, lastName }  = user;
            if (user.balance >= 1000000 & user.status === "ACTIVE") {
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
    </div>
  );
};

export default Dashboard;
