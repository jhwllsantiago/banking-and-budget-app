import { useEffect, useState } from "react";
import "./Budget.scss";
import timestamp from "../utility/timestamp";
import toTwoDecimal from "../utility/toTwoDecimal";

const Budget = ({ user }) => {
  const [budget, setBudget] = useState(user.balance);
  const [income, setIncome] = useState("0.00");

  const handleIncome = (value) => {
    if (value) {
      value = toTwoDecimal(value);
      setIncome(value);
    }
  };
  const handleIncomeClick = () => {
    setBudget((parseFloat(user.balance) + parseFloat(income)).toFixed(2));
  };

  return (
    <div className="budget">
      <div className="balance">
        <h1>BALANCE</h1>
        <h2>{user.balance}</h2>
      </div>
      <div className="remaining-budget">
        <h1>BUDGET</h1>
        <h2>{budget}</h2>
      </div>
      <div className="expected-income">
        <h3>Expected Income</h3>
        <input
          type="text"
          required
          spellCheck="false"
          autoComplete="false"
          maxLength="9"
          value={income}
          onFocus={() => setIncome("")}
          onBlur={()=> setIncome(income)}
          onChange={(e) =>
            handleIncome(
              e.target.value
                .replace(/[^0-9.]/g, "")
                .replace(/(\..*?)\..*/g, "$1")
            )
          }
        />
        <button onClick={handleIncomeClick}>OK</button>
      </div>
      <div className="allocate-budget"></div>
      <div className="expenses"></div>
    </div>
  );
};

export default Budget;
