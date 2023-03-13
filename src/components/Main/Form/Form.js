import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTransaction } from "../../../features/transactionSlice";

const Form = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: "",
    type: "",
    amount: "",
  });

  const createHandler = (e) => {
    e.preventDefault();
    dispatch(createTransaction(form));
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
          <button type="submit" className="btn">
            Add Transaction
          </button>
        </form>

        <button className="btn cancel_edit">Cancel Edit</button>
      </div>
    </>
  );
};

export default Form;
