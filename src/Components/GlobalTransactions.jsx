import { useState } from "react";
import "./GlobalTransactions.scss";
import { TbMoodEmpty } from "react-icons/tb";
import { useEffect } from "react";

const GlobalTransactions = () => {
  const TRANSACTIONS = localStorage.getItem("TRANSACTIONS")
    ? JSON.parse(localStorage.getItem("TRANSACTIONS"))
    : [];
  const [transactions, setTransactions] = useState(TRANSACTIONS);
  const [depositChecked, setDepositChecked] = useState(true);
  const [withdrawChecked, setWithdrawChecked] = useState(true);
  const [transferChecked, setTransferChecked] = useState(true);
  const [filteredTypes, setFilteredTypes] = useState([]);

  const handleChange = (type) => {
    if (filteredTypes.includes(type)) {
      const updated = filteredTypes.filter((filtered) => filtered !== type);
      setFilteredTypes(updated);
    } else {
      setFilteredTypes([...filteredTypes, type]);
    }
  };
  useEffect(() => {
    const filtered = TRANSACTIONS.filter((transaction) => {
      return filteredTypes.indexOf(transaction.type) === -1;
    });
    setTransactions(filtered);
  }, [filteredTypes]);

  const handleDelete = () => {
    setTransactions([]);
    localStorage.setItem("TRANSACTIONS", JSON.stringify([]));
  };

  return (
    <div className="global-transactions">
      <div className="transactions-table">
        <div className="transactions-header">
          <h3>TIME</h3>
          <div>
            <h3>TYPE</h3>
            <div className="transactions-controls">
              <div>
                <input
                  type="checkbox"
                  checked={depositChecked}
                  onClick={() => setDepositChecked(!depositChecked)}
                  onChange={() => handleChange("Deposit")}
                />
                <label>Deposits</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  checked={withdrawChecked}
                  onClick={() => setWithdrawChecked(!withdrawChecked)}
                  onChange={() => handleChange("Withdraw")}
                />
                <label>Withdrawals</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  checked={transferChecked}
                  onClick={() => setTransferChecked(!transferChecked)}
                  onChange={() => handleChange("Transfer")}
                />
                <label>Transfers</label>
              </div>
            </div>
          </div>
          <h3>AMOUNT</h3>
          <h3>SENDER</h3>
          <h3>RECIPIENT</h3>
          <h3>CHANNEL</h3>
        </div>

        <div className="no-transactions">
          {transactions.length === 0 && (
            <p>
              NO TRANSACTIONS <TbMoodEmpty />
            </p>
          )}
        </div>

        <ul className="transactions-list">
          {transactions.map((transaction, idx) => {
            return (
              <li key={idx}>
                <div>{transaction.time}</div>
                <div>{transaction.type}</div>
                <div>{transaction.amount}</div>
                <div>{transaction.sender}</div>
                <div>{transaction.recipient}</div>
                <div>{transaction.channel}</div>
              </li>
            );
          })}
        </ul>
      </div>

      <button onClick={handleDelete}>Clear Transactions</button>
    </div>
  );
};

export default GlobalTransactions;
