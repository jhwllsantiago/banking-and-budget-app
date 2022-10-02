import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./MoneyTransfer.scss";
import timestamp from "../utility/timestamp";
import toTwoDecimal from "../utility/toTwoDecimal";

const MoneyTransfer = ({
  users,
  setUsers,
  navigatePath,
  showChannelSelect,
}) => {
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
  const [fundsRecipient, setFundsRecipient] = useState("");
  const [fundsRecipientIndex, setFundsRecipientIndex] = useState(-1);
  const [selectedChannel, setSelectedChannel] = useState("GCASH");

  const newTransaction = (
    type,
    sender = "N/A",
    senderName = "N/A",
    recipient = "N/A",
    recipientName = "N/A",
    amount,
    channel
  ) => {
    const channelToSave = showChannelSelect ? channel : "ADMIN";
    const transaction = {
      type: type,
      sender: sender,
      senderName: senderName,
      recipient: recipient,
      recipientName: recipientName,
      amount: parseFloat(amount).toFixed(2),
      time: timestamp(),
      channel: channelToSave,
    };
    const transactions = [transaction, ...TRANSACTIONS];
    localStorage.setItem("TRANSACTIONS", JSON.stringify(transactions));
  };

  const handleDepositChange = (value) => {
    value = toTwoDecimal(value);
    setDepositAmount(value);
  };
  const handleDepositClick = () => {
    if (parseFloat(depositAmount) > 0) {
      let currentUsers = [...users];
      currentUsers[userIndex] = {
        ...user,
        balance: (parseFloat(user.balance) + parseFloat(depositAmount)).toFixed(
          2
        ),
      };
      localStorage.setItem("USERS", JSON.stringify(currentUsers));
      setUsers(currentUsers);
      newTransaction(
        "Deposit",
        accountNumber,
        `${user.firstName} ${user.lastName}`,
        undefined,
        undefined,
        depositAmount,
        selectedChannel
      );
      navigate(navigatePath);
    }
  };

  const handleWithdrawChange = (value) => {
    value = toTwoDecimal(value);
    setWithdrawAmount(value);
    setWithdrawAmountValid(parseFloat(value) <= parseFloat(user.balance));
  };
  const handleWithdrawClick = () => {
    if (withdrawAmountValid && parseFloat(withdrawAmount) > 0) {
      let currentUsers = [...users];
      currentUsers[userIndex] = {
        ...user,
        balance: (
          parseFloat(user.balance) - parseFloat(withdrawAmount)
        ).toFixed(2),
      };
      localStorage.setItem("USERS", JSON.stringify(currentUsers));
      setUsers(currentUsers);
      newTransaction(
        "Withdraw",
        undefined,
        undefined,
        accountNumber,
        `${user.firstName} ${user.lastName}`,
        withdrawAmount,
        selectedChannel
      );
      navigate(navigatePath);
    }
  };

  const handleAccountNo = (value) => {
    setTransferAccountNo(value);
    const fundsRecipient = users.find((user) => user.accountNumber === value);
    setTransferAccountNoValid(
      users.some((user) => user.accountNumber === value) &&
        fundsRecipient.accountNumber !== accountNumber &&
        fundsRecipient.status === "ACTIVE"
    );
    if (fundsRecipient) {
      setFundsRecipient(fundsRecipient);
      setFundsRecipientIndex(
        users.findIndex((user) => user.accountNumber === value)
      );
    }
  };
  const handleTransferAmount = (value) => {
    value = toTwoDecimal(value);
    setTransferAmount(value);
    setTransferAmountValid(parseFloat(value) <= parseFloat(user.balance));
  };
  const handleTransfer = () => {
    if (
      transferAccountNoValid &&
      transferAccountNo &&
      transferAmountValid &&
      parseFloat(transferAmount) > 0
    ) {
      let currentUsers = [...users];
      currentUsers[fundsRecipientIndex] = {
        ...fundsRecipient,
        balance: (
          parseFloat(fundsRecipient.balance) + parseFloat(transferAmount)
        ).toFixed(2),
      };
      currentUsers[userIndex] = {
        ...user,
        balance: (
          parseFloat(user.balance) - parseFloat(transferAmount)
        ).toFixed(2),
      };
      localStorage.setItem("USERS", JSON.stringify(currentUsers));
      setUsers(currentUsers);
      newTransaction(
        "Transfer",
        accountNumber,
        `${user.firstName} ${user.lastName}`,
        fundsRecipient.accountNumber,
        `${fundsRecipient.firstName} ${fundsRecipient.lastName}`,
        transferAmount,
        "CENTAVI"
      );
      navigate(navigatePath);
    }
  };

  return (
    <div className="money-transfer">
      <h3>Account No.: {accountNumber}</h3>
      <h3>
        Name: {user.firstName} {user.lastName}
      </h3>
      <h3>Balance: {user.balance}</h3>
      <div>
        <label>Deposit</label>
        <input
          type="text"
          required
          spellCheck="false"
          autoComplete="false"
          maxLength="9"
          value={depositAmount}
          onChange={(e) =>
            handleDepositChange(
              e.target.value
                .replace(/[^0-9.]/g, "")
                .replace(/(\..*?)\..*/g, "$1")
            )
          }
        />
      </div>
      <div>
        <label>Withdraw</label>
        <input
          type="text"
          required
          spellCheck="false"
          autoComplete="false"
          value={withdrawAmount}
          onChange={(e) =>
            handleWithdrawChange(
              e.target.value
                .replace(/[^0-9.]/g, "")
                .replace(/(\..*?)\..*/g, "$1")
            )
          }
          className={withdrawAmountValid ? "" : "red-outline"}
        />
      </div>
      {showChannelSelect && (
        <div>
          <label>Channel</label>
          <select
            value={selectedChannel}
            onChange={(e) => setSelectedChannel(e.target.value)}
          >
            <option value="GCASH">GCASH</option>
            <option value="MAYA">MAYA</option>
            <option value="PAYPAL">PAYPAL</option>
            <option value="BDO">BDO</option>
            <option value="BPI">BPI</option>
          </select>
        </div>
      )}
      <button onClick={handleDepositClick}>Deposit</button>
      <button onClick={handleWithdrawClick}>Withdraw</button>
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
            spellCheck="false"
            autoComplete="false"
            value={transferAmount}
            onChange={(e) =>
              handleTransferAmount(
                e.target.value
                  .replace(/[^0-9.]/g, "")
                  .replace(/(\..*?)\..*/g, "$1")
              )
            }
            className={transferAmountValid ? "" : "red-outline"}
          />
        </div>
        {!transferAccountNoValid && <p>Invalid account number.</p>}
        {transferAccountNoValid && fundsRecipient && (
          <p>
            {`Transfering funds to ${fundsRecipient.firstName} ${fundsRecipient.lastName}`}
          </p>
        )}
        <button onClick={handleTransfer}>Transfer</button>
      </div>
      <button onClick={() => navigate(navigatePath)}>Cancel</button>
    </div>
  );
};

export default MoneyTransfer;
