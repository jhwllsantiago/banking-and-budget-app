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

  const [senderSearch, setSenderSearch] = useState("");
  const [recipientSearch, setRecipientSearch] = useState("");

  const handleChange = (type) => {
    setSenderSearch("");
    setRecipientSearch("");
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

  const resetChecked = () => {
    setFilteredTypes([]);
    setDepositChecked(true);
    setWithdrawChecked(true);
    setTransferChecked(true);
  };

  const handleDelete = () => {
    setTransactions([]);
    localStorage.setItem("TRANSACTIONS", JSON.stringify([]));
  };

  const handleSenderSearch = (value) => {
    setSenderSearch(value);
    const filtered = TRANSACTIONS.filter((transaction) =>
      transaction.sender.includes(value)
    );
    setTransactions(filtered);
    if (value === "") setTransactions(TRANSACTIONS);
  };

  const handleRecipientSearch = (value) => {
    setRecipientSearch(value);
    const filtered = TRANSACTIONS.filter((transaction) =>
      transaction.recipient.includes(value)
    );
    setTransactions(filtered);
    if (value === "") setTransactions(TRANSACTIONS);
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
          <div>
            <h3>SENDER</h3>
            <input
              type="text"
              maxLength="10"
              value={senderSearch}
              onChange={(e) => handleSenderSearch(e.target.value)}
              onFocus={() => {
                setRecipientSearch("");
                resetChecked();
              }}
            />
          </div>
          <div>
            <h3>RECIPIENT</h3>
            <input
              type="text"
              maxLength="10"
              value={recipientSearch}
              onChange={(e) => handleRecipientSearch(e.target.value)}
              onFocus={() => {
                setSenderSearch("");
                resetChecked();
              }}
            />
          </div>
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
