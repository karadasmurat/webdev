import { useReducer, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class ActionFactory {
  static TYPE_DEPOSIT = "balance/deposit";
  static TYPE_WITHDRAW = "balance/withdraw";

  //   constructor() {}

  static deposit(amount) {
    return { type: this.TYPE_DEPOSIT, payload: amount };
  }

  static withdraw(amount) {
    return { type: this.TYPE_WITHDRAW, payload: amount };
  }
}

export default function RecuderDemo() {
  // instead of setting state, we will dispatch actions
  // note the error field in state
  const [balance, dispatch] = useReducer(balanceReducer, {
    total: 0,
    error: null,
  });

  const balanceRef = useRef(null);

  function balanceReducer(state, action) {
    // console.log("action", action);
    // console.log("current state", typeof state, state);

    const currentBalance = state.total;
    const amount = parseFloat(action.payload);
    let newBalance = 0;
    let err = null;

    switch (action.type) {
      case ActionFactory.TYPE_DEPOSIT:
        newBalance = currentBalance + amount;

        break;
      case ActionFactory.TYPE_WITHDRAW:
        newBalance = currentBalance - amount;

        // what if balance going negative?
        if (newBalance < 0) {
          err = {
            code: "NOT_ENOUGH_FUNDS",
            message: `Balance: ${currentBalance} is not enough to cover requested: ${amount}`,
          };
          newBalance = currentBalance;

          toast(
            `Balance: ${currentBalance} is not enough to cover requested: ${amount}`
          );
          // throw new Error("Not Enough Money.");
        }

        break;

      default:
        // throw an error?
        break;
    }
    //return nextState
    // console.log(newBalance);
    const newState = { total: newBalance, error: err };
    console.log(newState);
    return newState;
  }

  function isFloat(value) {
    // Use parseFloat to attempt to parse the value as a float
    const floatValue = parseFloat(value);

    // Check if the parsed value is a number and not NaN
    return !isNaN(floatValue) && typeof floatValue === "number";
  }

  function deposit(amount) {
    if (isFloat(amount)) {
      // instead of setting state, we dispatch action in handler.
      dispatch(ActionFactory.deposit(amount));
    } else {
      toast("Invalid Amount.");
    }
  }

  function withdraw(amount) {
    if (isFloat(amount)) {
      dispatch(ActionFactory.withdraw(amount));
    } else {
      toast("Invalid Amount.");
    }
  }

  return (
    <>
      <h1 className="mb-3">Balance: {balance.total}</h1>
      <div className="mb-3">
        <label htmlFor="balance">Amount</label>
        <input type="text" ref={balanceRef} name="balance" />
      </div>
      <div className="d-flex">
        <button
          onClick={() => deposit(balanceRef.current.value)}
          className="btn btn-success me-2"
        >
          Deposit
        </button>
        <button
          onClick={() => withdraw(balanceRef.current.value)}
          className="btn btn-warning"
        >
          Withdraw
        </button>
      </div>
      <ToastContainer />
    </>
  );
}
