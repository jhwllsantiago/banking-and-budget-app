import "./Dashboard.scss";
import { Chart } from "react-google-charts";

//Icons//
import { RiVipCrownFill } from "react-icons/ri";

const Dashboard = () => {
  const USERS = localStorage.getItem("USERS")
    ? JSON.parse(localStorage.getItem("USERS"))
    : [];

  const TRANSACTIONS = localStorage.getItem("TRANSACTIONS")
    ? JSON.parse(localStorage.getItem("TRANSACTIONS"))
    : [];

  const activeUsersData = [["Client", "Balance"]];

  let activeUsersBalance = 0;
  let pendingRequests = 0;
  const vipClients = [];

  const activeUsersDataOptions = {
    legend: "name",
    pieSliceText: "none",
    pieHole: 0.5,
    is3D: false,
    backgroundColor: "#e3e3e3",
  };

  let vipShares = 0;
  let notVipShares = 0;

  const vipSharesGraphOptions = {
    legend: "",
    pieSliceText: "",
    pieStartAngle: 110,
    tooltip: { trigger: "none" },
    slices: {
      0: { color: "brown" },
      1: { color: "white" },
    },
    backgroundColor: "transparent",
  };

  USERS.forEach((user) => {
    const { ...users } = user;
    const { firstName, lastName, balance, status } = users;
    const fullName = `${firstName} ${lastName}`;

    if (status === "ACTIVE") {
      const activeUser = [fullName, parseFloat(balance)];
      activeUsersData.push(activeUser);
      activeUsersBalance += parseFloat(balance);
    }

    if (status === "PENDING") {
      pendingRequests += 1;
    }

    if ((status === "ACTIVE") & (parseFloat(balance) >= 1000000)) {
      vipShares += parseFloat(balance);
      vipClients.push(fullName);
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
          {activeUsersData.length > 1 ? (
            <Chart
              chartType="PieChart"
              data={activeUsersData}
              options={activeUsersDataOptions}
            />
          ) : (
            <span className="no-users-span">No centavi users</span>
          )}
        </div>
        {USERS.length > 0 && (
          <p className="active-users-text">
            <span>{activeUsersData.length - 1}</span> active users with{" "}
            <br></br>
            <span> ₱{activeUsersBalance.toFixed(2)}</span> total balance.
          </p>
        )}
      </div>
      <div className="dashboard-graph vip-shares-graph">
        <h3>VIP Shares</h3>
        <div className="vip-shares-pie-chart">
          {vipClients.length > 0 ? (
            <Chart
              chartType="PieChart"
              data={vipSharesData}
              options={vipSharesGraphOptions}
            />
          ) : (
            <span>none</span>
          )}
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
          <span className="transactions-number">{TRANSACTIONS.length}</span>
          <br></br>
          <span className="transactions-span">
            total successful transactions.
          </span>{" "}
        </div>
      </div>
      <div className="dashboard-graph vip-graph">
        <h3>
          <RiVipCrownFill /> VIP
        </h3>
        <div className="vip-list">
          {vipClients.length > 0 ? (
            <ul>
              {USERS.map((user, idx) => {
                const { firstName, lastName } = user;
                if ((user.balance >= 1000000) & (user.status === "ACTIVE")) {
                  return (
                    <li key={idx}>
                      {" "}
                      {lastName}, {firstName}
                    </li>
                  );
                } else {
                  return null;
                }
              })}
            </ul>
          ) : (
            <span>No VIPs</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
