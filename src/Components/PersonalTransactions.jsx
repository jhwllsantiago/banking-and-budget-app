import "./PersonalTransactions.scss";
import { TbMoodEmpty } from "react-icons/tb";

const PersonalTransactions = ({ user, transactions }) => {
  const deposits = transactions.filter(
    (transaction) => transaction.type === "Deposit"
  );
  const withdrawals = transactions.filter(
    (transaction) => transaction.type === "Withdraw"
  );
  const transfers = transactions.filter(
    (transaction) => transaction.type === "Transfer"
  );

  return (
    <div className="personal-transactions">
      <div className="deposits-table table">
        <h3>DEPOSITS</h3>
        <div className="table-header">
          <h4>DATE &#38; TIME</h4>
          <h4>AMOUNT</h4>
        </div>
        {deposits.length === 0 && (
          <span className="empty">
            NO DEPOSITS <TbMoodEmpty />
          </span>
        )}
        <ul className="table-list">
          {deposits.map((transaction, idx) => {
            return (
              <li key={idx}>
                <div>{transaction.time}</div>
                <div>{transaction.amount}</div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="withdrawals-table table">
        <h3>WITHDRAWALS</h3>
        <div className="table-header">
          <h4>DATE &#38; TIME</h4>
          <h4>AMOUNT</h4>
        </div>
        {withdrawals.length === 0 && (
          <span className="empty">
            NO WITHDRAWALS <TbMoodEmpty />
          </span>
        )}
        <ul className="table-list">
          {withdrawals.map((transaction, idx) => {
            return (
              <li key={idx}>
                <div>{transaction.time}</div>
                <div>{transaction.amount}</div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="transfers-table">
        <h3>TRANSFERS</h3>
        <div className="transfers-header">
          <h4>DATE &#38; TIME</h4>
          <h4>TYPE</h4>
          <h4>AMOUNT</h4>
          <h4>NAME</h4>
          <h4>ACCOUNT NO.</h4>
        </div>
        {transfers.length === 0 && (
          <span className="empty">
            NO TRANSFERS <TbMoodEmpty />
          </span>
        )}
        <ul className="transfers-list">
          {transfers.map((transaction, idx) => {
            return (
              <li key={idx}>
                <div>{transaction.time}</div>
                <div>
                  {transaction.sender === user.accountNumber
                    ? "OUTGOING"
                    : "INCOMING"}
                </div>
                <div>{transaction.amount}</div>
                <div>
                  {transaction.sender === user.accountNumber
                    ? transaction.recipientName
                    : transaction.senderName}
                </div>
                <div>
                  {transaction.sender === user.accountNumber
                    ? transaction.recipient
                    : transaction.sender}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default PersonalTransactions;
