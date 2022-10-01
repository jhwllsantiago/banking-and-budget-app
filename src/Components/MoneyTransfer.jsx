import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./MoneyTransfer.scss";
import timestamp from "../utility/timestamp";

const MoneyTransfer = ({ users, setUsers, channel }) => {
  const TRANSACTIONS = localStorage.getItem("TRANSACTIONS")
    ? JSON.parse(localStorage.getItem("TRANSACTIONS"))
    : [];

  const navigate = useNavigate();
  const { accountNumber } = useParams();
  let user = users.find((user) => user.accountNumber === accountNumber);
  let userIndex = users.findIndex(
    (user) => user.accountNumber === accountNumber
  );

  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawAmountValid, setWithdrawAmountValid] = useState(true);
  const [transferAccountNo, setTransferAccountNo] = useState("");
  const [transferAccountNoValid, setTransferAccountNoValid] = useState(true);
  const [transferAmount, setTransferAmount] = useState("");
  const [transferAmountValid, setTransferAmountValid] = useState(true);
  const [fundsReceiver, setFundsReceiver] = useState("");
  const [fundsReceiverIndex, setFundsReceiverIndex] = useState(-1);

  const newTransaction = (
    type,
    sender = "centavi",
    recipient = "centavi",
    amount
  ) => {
    const transaction = {
      type: type,
      sender: sender,
      recipient: recipient,
      amount: amount,
      time: timestamp(),
      channel: channel,
    };
    const transactions = [...TRANSACTIONS, transaction];
    localStorage.setItem("TRANSACTIONS", JSON.stringify(transactions));
  };

  const handleDeposit = () => {
    if (parseInt(depositAmount) > 0) {
      let currentUsers = [...users];
      currentUsers[userIndex] = {
        ...user,
        amount: parseInt(user.amount) + parseInt(depositAmount),
      };
      localStorage.setItem("USERS", JSON.stringify(currentUsers));
      setUsers(currentUsers);
      newTransaction("Deposit", accountNumber, undefined, depositAmount);
      navigate("/admin/manage");
    }
  };

  const handleWithdrawChange = (value) => {
    setWithdrawAmount(value);
    setWithdrawAmountValid(parseInt(value) <= parseInt(user.amount));
  };
  const handleWithdrawClick = () => {
    if (withdrawAmountValid && parseInt(withdrawAmount) > 0) {
      let currentUsers = [...users];
      currentUsers[userIndex] = {
        ...user,
        amount: parseInt(user.amount) - parseInt(withdrawAmount),
      };
      localStorage.setItem("USERS", JSON.stringify(currentUsers));
      setUsers(currentUsers);
      newTransaction("Withdraw", undefined, accountNumber, withdrawAmount);
      navigate("/admin/manage");
    }
  };

  const handleAccountNo = (value) => {
    setTransferAccountNo(value);
    setTransferAccountNoValid(
      users.some((user) => user.accountNumber === value)
    );
    const fundsReceiver = users.find((user) => user.accountNumber === value);
    if (fundsReceiver) {
      setFundsReceiver(fundsReceiver);
      setFundsReceiverIndex(
        users.findIndex((user) => user.accountNumber === value)
      );
    }
  };
  const handleTransferAmount = (value) => {
    setTransferAmount(value);
    setTransferAmountValid(parseInt(value) <= parseInt(user.amount));
  };
  const handleTransfer = () => {
    if (
      transferAccountNoValid &&
      transferAccountNo &&
      transferAmountValid &&
      parseInt(transferAmount) > 0
    ) {
      let currentUsers = [...users];
      currentUsers[fundsReceiverIndex] = {
        ...fundsReceiver,
        amount: parseInt(fundsReceiver.amount) + parseInt(transferAmount),
      };
      currentUsers[userIndex] = {
        ...user,
        amount: parseInt(user.amount) - parseInt(transferAmount),
      };
      localStorage.setItem("USERS", JSON.stringify(currentUsers));
      setUsers(currentUsers);
      newTransaction(
        "Transfer",
        accountNumber,
        fundsReceiver.accountNumber,
        transferAmount
      );
      navigate("/admin/manage");
    }
  };

  return (
    <div className="money-transfer">
      <h3>Account No.: {accountNumber}</h3>
      <h3>
        Name: {user.firstName} {user.lastName}
      </h3>
      <h3>Balance: {user.amount}</h3>
      <div>
        <label>Deposit</label>
        <input
          type="text"
          required
          maxLength="7"
          spellCheck="false"
          autoComplete="false"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value.replace(/\D/g, ""))}
        />
        <button onClick={handleDeposit}>Deposit</button>
      </div>
      <div>
        <label>Withdraw</label>
        <input
          type="text"
          required
          maxLength="7"
          spellCheck="false"
          autoComplete="false"
          value={withdrawAmount}
          onChange={(e) =>
            handleWithdrawChange(e.target.value.replace(/\D/g, ""))
          }
          className={withdrawAmountValid ? "" : "red-outline"}
        />
        <button onClick={handleWithdrawClick}>Withdraw</button>
      </div>
      <div>
        <h4>Transfer Funds</h4>
        <div>
          <label>Account No</label>
          <input
            type="text"
            required
            maxLength="10"
            spellCheck="false"
            autoComplete="false"
            value={transferAccountNo}
            onChange={(e) => handleAccountNo(e.target.value.replace(/\D/g, ""))}
            className={transferAccountNoValid ? "" : "red-outline"}
          />
        </div>
        <div>
          <label>Amount</label>
          <input
            type="text"
            required
            maxLength="7"
            spellCheck="false"
            autoComplete="false"
            value={transferAmount}
            onChange={(e) =>
              handleTransferAmount(e.target.value.replace(/\D/g, ""))
            }
            className={transferAmountValid ? "" : "red-outline"}
          />
        </div>
        {!transferAccountNoValid && <p>Account does not exist</p>}
        {transferAccountNoValid && fundsReceiver && (
          <p>
            {`Transfering funds to ${fundsReceiver.firstName} ${fundsReceiver.lastName}`}
          </p>
        )}
        <button onClick={handleTransfer}>Transfer</button>
      </div>
      <button onClick={() => navigate("/admin/manage")}>Cancel</button>
    </div>
  );
};

export default MoneyTransfer;
