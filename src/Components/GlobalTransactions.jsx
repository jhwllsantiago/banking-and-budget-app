import { useState, useEffect } from "react";

const GlobalTransactions = () => {
  const GLOBAL_TRANSACTIONS = localStorage.getItem("GLOBAL_TRANSACTIONS");
  const global = GLOBAL_TRANSACTIONS ? JSON.parse(GLOBAL_TRANSACTIONS) : [];
  const [transactions, setTransactions] = useState(global);
  useEffect(() => {
    localStorage.setItem("GLOBAL_TRANSACTIONS", JSON.stringify(transactions));
  }, [transactions]);

  return (
    <div className="global-transactions">
      <p>global transac</p>
    </div>
  );
};

export default GlobalTransactions;
