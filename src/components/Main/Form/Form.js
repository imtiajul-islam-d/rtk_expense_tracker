import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTransaction, editEnd } from "../../../features/transaction/transactionSlice";

const Form = ({ edit, setEdit }) => {
  const { isLoading, isError, error } = useSelector(
    (state) => state.transaction
  );
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: "",
    type: "",
    amount: "",
  });

  const createHandler = (e) => {
    e.preventDefault();
    dispatch(createTransaction({ ...form, amount: Number(form.amount) }));
    setForm({
      name: "",
      type: "",
      amount: "",
    });
    e.target.reset();
  };
  return (
    <>
      <div className="form">
        <h3>Add new transaction</h3>
        <form onSubmit={createHandler}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              required
              value={form?.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group radio">
            <label>Type</label>
            <div className="radio_group">
              <input
                type="radio"
                value="income"
                name="type"
                required
                checked={form.type === "income"}
                onChange={(e) =>
                  setForm({
                    ...form,
                    type: "income",
                  })
                }
              />
              <label>Income</label>
            </div>
            <div className="radio_group">
              <input
                type="radio"
                value="expense"
                name="type"
                placeholder="Expense"
                checked={form.type === "expense"}
                onChange={(e) =>
                  setForm({
                    ...form,
                    type: "expense",
                  })
                }
              />
              <label>Expense</label>
            </div>
          </div>

          <div className="form-group">
            <label>Amount</label>
            <input
              type="number"
              placeholder="Enter amount"
              name="amount"
              onChange={(e) =>
                setForm({
                  ...form,
                  amount: e.target.value,
                })
              }
            />
          </div>
          <button disabled={isLoading} type="submit" className="btn">
            {isLoading ? "Posting" : "Add Transaction"}
          </button>
          {!isLoading && isError && <p className="error">{error}</p>}
        </form>

        {edit && <button onClick={(e) => {
          dispatch(editEnd())
          setEdit(false)
        }} className="btn cancel_edit">Cancel Edit</button>}
      </div>
    </>
  );
};

export default Form;
