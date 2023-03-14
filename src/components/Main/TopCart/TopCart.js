import React from "react";
import { useSelector } from "react-redux";
import numberWithCommas from "../../../utils/thousandSeparators";

const TopCart = () => {
  const { transactions } = useSelector((state) => state.transaction);
  const calculate = (transactions) => {
    let balance = 0;
    transactions.forEach((t) => {
      const { type, amount } = t;
      if (type === "income") {
        balance += amount;
      } else {
        balance -= amount;
      }
    });
    return balance;
  };

  return (
    <>
      <div className="top_card">
        <p>Your Current Balance</p>
        <h3>
          <span>৳ </span>
          {transactions?.length > 0 ? (
            <span>{numberWithCommas(calculate(transactions))}</span>
          ) : (
            <span>0</span>
          )}
        </h3>
      </div>
    </>
  );
};

export default TopCart;
