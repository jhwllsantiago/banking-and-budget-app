import { useState, useEffect } from "react";
import "./Budget.scss";
import toTwoDecimal from "../utility/toTwoDecimal";
import greeting from "../utility/greeting";
import { Chart } from "react-google-charts";

import { AiFillEdit, AiOutlineSave } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdSavings } from "react-icons/md";

const Budget = ({ user }) => {
  const BUDGETS = localStorage.getItem("BUDGETS")
    ? JSON.parse(localStorage.getItem("BUDGETS"))
    : [];
  const storedBudgetState = BUDGETS.find(
    (item) => item.accountNumber === user.accountNumber
  );
  const storedBudgetStateIdx = BUDGETS.findIndex(
    (item) => item.accountNumber === user.accountNumber
  );
  const defaultState = {
    accountNumber: user.accountNumber,
    isBudgetActive: false,
    storedIncome: "0.00",
    storedBudgetList: [],
  };
  const initialState = storedBudgetState ? storedBudgetState : defaultState;
  const { isBudgetActive, storedIncome, storedBudgetList } = initialState;
  const [budget, setBudget] = useState(user.balance);
  const [income, setIncome] = useState(storedIncome);
  const [incomeDisabled, setIncomeDisabled] = useState(isBudgetActive);
  const [savings, setSavings] = useState([
    "Savings",
    parseFloat(user.balance) + parseFloat(income),
  ]);
  const [budgetList, setBudgetList] = useState(storedBudgetList);
  const [category, setCategory] = useState("");
  const [allocation, setAllocation] = useState("");
  const [editingAllocation, setEditingAllocation] = useState("");
  const [editingIndex, setEditingIndex] = useState(-1);

  const handleStateSaving = () => {
    const newState = {
      accountNumber: user.accountNumber,
      isBudgetActive: incomeDisabled,
      storedIncome: income,
      storedBudgetList: budgetList,
    };
    const newBUDGETS = [...BUDGETS];
    const index =
      storedBudgetStateIdx > -1
        ? storedBudgetStateIdx
        : BUDGETS.length === 0
        ? 0
        : BUDGETS.length;
    newBUDGETS[index] = newState;
    localStorage.setItem("BUDGETS", JSON.stringify(newBUDGETS));
  };

  const handleIncome = (value) => {
    value = toTwoDecimal(value);
    setIncome(value);
  };
  const handleIncomeClick = () => {
    if (income && !incomeDisabled) {
      setBudget((parseFloat(user.balance) + parseFloat(income)).toFixed(2));
    }
  };

  const handleAllocation = (value) => {
    value = toTwoDecimal(value);
    setAllocation(value);
  };
  const handleBudgetAdd = () => {
    if (parseFloat(income)) {
      handleIncomeClick();
      setIncome(parseFloat(income).toFixed(2));
    }
    if (category && parseFloat(allocation) > 0) {
      const newBudgetList = [...budgetList, [category, parseFloat(allocation)]];
      const newBudget = parseFloat(budget) - parseFloat(allocation);
      setBudget(newBudget.toFixed(2));
      setBudgetList(newBudgetList);
      setIncomeDisabled(true);
    }
  };
  useEffect(() => {
    setSavings(["Savings", parseFloat(budget) > 0 ? parseFloat(budget) : 0]);
  }, [budget]);

  const handleReset = () => {
    setBudget(parseFloat(user.balance).toFixed(2));
    setBudgetList([]);
    setIncome("0.00");
    setIncomeDisabled(false);
  };

  const handleBudgetEdit = (idx, defaultValue) => {
    setEditingIndex(idx);
    setEditingAllocation(defaultValue);
  };
  const handleBudgetUpdate = (idx) => {
    const updatedBudgetList = budgetList.map((item, index) => {
      if (index === idx) {
        return [item[0], parseFloat(editingAllocation)];
      } else {
        return item;
      }
    });
    setBudgetList(updatedBudgetList);
    setEditingIndex(-1);
  };
  const handleBudgetDelete = (idx) => {
    setBudget((budget) =>
      (parseFloat(budget) + parseFloat(budgetList[idx][1])).toFixed(2)
    );
    setBudgetList((item) => {
      return item.filter((_, index) => index !== idx);
    });
  };

  useEffect(() => {
    const parsedIncome = parseFloat(income) || 0;
    let sumOfBudgeted = 0;
    budgetList.forEach((item) => (sumOfBudgeted = sumOfBudgeted + item[1]));
    const newBudget = (
      parseFloat(user.balance) +
      parsedIncome -
      sumOfBudgeted
    ).toFixed(2);
    setBudget(newBudget);
    handleStateSaving(); // eslint-disable-next-line
  }, [budgetList]);

  return (
    <div className="budget budget-tile">
      <div className="greeting tile">
        <h1>{greeting()}, {user.firstName}!</h1>
      </div>
      <div className="balance budget-tile">
        <h1>BALANCE</h1>
        <h2>₱ {user.balance}</h2>
      </div>
      <div className="remaining-budget budget-tile">
        <h1>BUDGET</h1>
        <h2>₱ {budget}</h2>
      </div>
      <div className="expected-income budget-tile">
        <h3>Expected Income</h3>
        {incomeDisabled ? (
          <div className="expected-income-value">
            {parseFloat(income) ? `₱ ${parseFloat(income).toFixed(2)}` : "0.00"}
          </div>
        ) : (
          <div className="expected-income-input-container">
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
        )}
      </div>
      <div className="budget-allocation budget-tile">
        <h3>Budget Allocation</h3>
        <div className="category-container category-allocation-container">
          <label>Category</label>
          <input
            type="text"
            spellCheck="false"
            autoComplete="false"
            placeholder="Transportation"
            maxLength="20"
            value={category}
            onChange={(e) => setCategory(e.target.value.trimStart())}
          />
        </div>
        <div className="allocation-container category-allocation-container">
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
        <button onClick={handleBudgetAdd} className="add-budget-button">
          Allocate
        </button>
        <button onClick={handleReset} className="reset-button">
          X
        </button>
      </div>
      <div className="budget-table budget-tile">
        <h3>Budget List</h3>
        <div className="budget-header">
          <h4>Category</h4>
          <h4>Allocation</h4>
          <h4>Actions</h4>
        </div>
        {budgetList.length === 0 && (
          <div className="no-budget-list">
            <p>
              <MdSavings size={"30px"} />
              <MdSavings size={"30px"} />
              <MdSavings size={"30px"} />
              <MdSavings size={"30px"} />
              <MdSavings size={"30px"} />
            </p>
          </div>
        )}
        <ul className="budget-list">
          {budgetList.map((data, idx) => {
            return (
              <li key={idx}>
                <div>{data[0]}</div>
                {editingIndex === idx ? (
                  <input
                    type="text"
                    spellCheck="false"
                    autoComplete="false"
                    value={editingAllocation}
                    onChange={(e) =>
                      setEditingAllocation(
                        e.target.value
                          .replace(/[^0-9.]/g, "")
                          .replace(/(\..*?)\..*/g, "$1")
                      )
                    }
                    onBlur={() => handleBudgetUpdate(idx)}
                  />
                ) : (
                  <div>{data[1].toFixed(2)}</div>
                )}
                <div className="actions-icons">
                  {editingIndex === idx ? (
                    <i onClick={() => handleBudgetUpdate(idx)}>
                      <AiOutlineSave size={"20px"} />
                    </i>
                  ) : (
                    <i onClick={() => handleBudgetEdit(idx, data[1])}>
                      <AiFillEdit size={"20px"} />
                    </i>
                  )}
                  <i onClick={() => handleBudgetDelete(idx)}>
                    <RiDeleteBinLine size={"20px"} />
                  </i>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="chart budget-tile">
        <Chart
          chartType="PieChart"
          width="100%"
          height="100%"
          data={[["Category", "Allocation"], savings, ...budgetList]}
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
