import { useState, useRef } from "react";
import "./Budget.scss";
import toTwoDecimal from "../utility/toTwoDecimal";
import { Chart } from "react-google-charts";

import { AiFillEdit } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import { useEffect } from "react";

const Budget = ({ user }) => {
  const dataObj = {};
  const [budget, setBudget] = useState(user.balance);
  const [income, setIncome] = useState("0.00");
  const [incomeDisabled, setIncomeDisabled] = useState(false);
  const data = [
    ["Category", "Allocation"],
    ["Savings", parseFloat(user.balance) + parseFloat(income)],
  ];
  const [chartData, setChartData] = useState(data);
  const [allocation, setAllocation] = useState("");
  const categoryRef = useRef();

  const handleIncome = (value) => {
    if (value) {
      value = toTwoDecimal(value);
      setIncome(value);
    }
  };
  const handleIncomeClick = () => {
    if (income) {
      setBudget((parseFloat(user.balance) + parseFloat(income)).toFixed(2));
    }
  };

  const handleAllocation = (value) => {
    value = toTwoDecimal(value);
    setAllocation(value);
  };
  const handleBudgetAdd = () => {
    const category = categoryRef.current.value.trim();
    if (category && parseFloat(allocation) > 0) {
      const newChartData = [...chartData, [category, parseFloat(allocation)]];
      const newAllocation = parseFloat(budget) - parseFloat(allocation);
      setBudget(newAllocation.toFixed(2));
      setChartData(newChartData);
      setIncomeDisabled(true);
    }
  };
  useEffect(() => {
    setChartData((chartData) => {
      const newChartData = [...chartData];
      console.log("effect", newChartData);
      newChartData[1] = [
        "Savings",
        parseFloat(budget) > 0 ? parseFloat(budget) : 0,
      ];
      return newChartData;
    });
  }, [budget]);
  const handleBudgetReset = () => {
    setBudget((parseFloat(user.balance) + parseFloat(income)).toFixed(2));
    setChartData(data);
    setIncomeDisabled(false);
  };

  const handleCategoryEdit = (idx) => {};
  const handleCategoryDelete = (idx) => {
    setBudget((budget) =>
      (parseFloat(budget) + parseFloat(chartData[idx][1])).toFixed(2)
    );
    setChartData((item) => {
      return item.filter((_, index) => index !== idx);
    });
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
          spellCheck="false"
          autoComplete="false"
          disabled={incomeDisabled}
          value={income}
          onFocus={() => setIncome("")}
          onChange={(e) =>
            handleIncome(
              e.target.value
                .replace(/[^0-9.]/g, "")
                .replace(/(\..*?)\..*/g, "$1")
            )
          }
        />
        <button disabled={incomeDisabled} onClick={handleIncomeClick}>
          OK
        </button>
      </div>
      <div className="budget-allocation">
        <h3>Budget Allocation</h3>
        <div>
          <label>Category</label>
          <input
            type="text"
            spellCheck="false"
            autoComplete="false"
            placeholder="Transport"
            maxLength="20"
            ref={categoryRef}
          />
        </div>
        <div>
          <label>Allocation</label>
          <input
            type="text"
            spellCheck="false"
            autoComplete="false"
            placeholder="650.00"
            value={allocation}
            onChange={(e) =>
              handleAllocation(
                e.target.value
                  .replace(/[^0-9.]/g, "")
                  .replace(/(\..*?)\..*/g, "$1")
              )
            }
          />
        </div>
        <button onClick={handleBudgetAdd}>Add to budget</button>
        <button onClick={handleBudgetReset}>Reset budget</button>
      </div>
      <div className="budget-table">
        <h3>Budget List</h3>
        <div className="budget-header">
          <h4>Category</h4>
          <h4>Allocation</h4>
          <h4>Actions</h4>
        </div>
        <ul className="budget-list">
          {chartData.map((data, idx) => {
            if (idx === 0 || idx === 1) {
              return null;
            } else {
              return (
                <li key={idx}>
                  <div>{data[0]}</div>
                  <div>{data[1].toFixed(2)}</div>
                  <div>
                    <i onClick={() => handleCategoryEdit(idx)}>
                      <AiFillEdit />
                    </i>
                    <i onClick={() => handleCategoryDelete(idx)}>
                      <RiDeleteBinLine />
                    </i>
                  </div>
                </li>
              );
            }
          })}
        </ul>
      </div>
      <div className="chart">
        <Chart
          chartType="PieChart"
          width="400px"
          height="400px"
          data={chartData}
          options={{
            title: `${user.firstName}'s Budget`,
            pieHole: 0.4,
            is3D: false,
            backgroundColor: "transparent",
          }}
        />
      </div>
    </div>
  );
};

export default Budget;
