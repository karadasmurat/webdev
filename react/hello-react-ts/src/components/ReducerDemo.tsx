import { useReducer, useState } from "react";

export default function ReducerDemo() {
  //   const [balance, setBalance] = useState(0);
  const [balance, dispatch] = useReducer(balanceReducer, 0);

  //   function updateBalance(amount: number) {
  //     const calculatedBalance = balance + amount;
  //     setBalance(calculatedBalance >= 0 ? calculatedBalance : balance);
  //   }

  type ActionType = {
    type: string;
    payload?: number;
  };

  function balanceReducer(state: number, action: ActionType): number {
    switch (action.type) {
      //  When you debit an account, you are adding funds or increasing the balance.
      case "balance/debit":
        return action.payload ? state + action.payload : state;

      // When you credit an account, you are reducing funds or decreasing the balance.
      case "balance/credit":
        return action.payload ? state - action.payload : state;

      case "balance/zero":
        return 0;

      default:
        return state;
    }
  }

  return (
    <div>
      <h3>Balance: {balance} </h3>
      <button
        onClick={() => {
          dispatch({ type: "balance/zero" });
        }}
        className="btn btn-danger mx-1"
      >
        Spend All
      </button>
      <button
        onClick={() => {
          dispatch({ type: "balance/credit", payload: 11 });
        }}
        className="btn btn-warning mx-1"
      >
        Spend
      </button>
      <button
        onClick={() => {
          dispatch({ type: "balance/debit", payload: 11 });
        }}
        className="btn btn-success mx-1"
      >
        Save
      </button>
    </div>
  );
}
