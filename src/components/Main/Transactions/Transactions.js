import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransaction } from "../../../features/transaction/transactionSlice";
import Transaction from "./Transaction";

const Transactions = ({setEditMode}) => {
  const { transactions, isLoading, isError, error } = useSelector(
    (state) => state.transaction
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTransaction());
  }, [dispatch]);

  // decide what to render
  let content = null;
  if (isLoading) content = <div>Loading...</div>;
  if (!isLoading && isError) content = <div className="erro">{error}</div>;
  if (!isLoading && !isError && transactions.length > 0) {
    content = transactions?.map((t) => <Transaction key={t.id} item={t} setEditMode={setEditMode} />);
  }
  if (!isLoading && !isError && transactions.length === 0) {
    content = <div>No data found!!</div>;
  }

  return (
    <>
      <p className="second_heading">Your Transactions:</p>
      <div className="conatiner_of_list_of_transactions">
        <ul>{content}</ul>
      </div>
    </>
  );
};

export default Transactions;
