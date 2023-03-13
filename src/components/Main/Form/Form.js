import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTransaction,
  editEnd,
  modifyTransaction,
} from "../../../features/transaction/transactionSlice";

const Form = ({ editMode, setEditMode }) => {
  const { isLoading, isError, error, edit } = useSelector(
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
  const editHandler = (e) => {
    e.preventDefault();
    dispatch(modifyTransaction({ id: edit?.id, data: form }));
    setForm({
      name: "",
      type: "",
      amount: "",
    });
    e.target.reset();
    setEditMode(false);
    dispatch(editEnd());
  };
  useEffect(() => {
    if (edit) {
      setForm({
        name: edit.name,
        type: edit.type,
        amount: edit.amount,
      });
    } else {
      setForm({
        name: "",
        type: "",
        amount: "",
      });
    }
  }, [edit]);
  return (
    <>
      <div className="form">
        <h3>Add new transaction</h3>
        <form onSubmit={edit ? editHandler : createHandler}>
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
              value={form.amount}
              onChange={(e) =>
                setForm({
                  ...form,
                  amount: e.target.value,
                })
              }
            />
          </div>
          {edit ? (
            <button disabled={isLoading} type="submit" className="btn">
              {isLoading ? "Editing" : "Edit Transaction"}
            </button>
          ) : (
            <button disabled={isLoading} type="submit" className="btn">
              {isLoading ? "Posting" : "Add Transaction"}
            </button>
          )}
          {!isLoading && isError && <p className="error">{error}</p>}
        </form>

        {editMode && (
          <button
            onClick={(e) => {
              dispatch(editEnd());
              setEditMode(false);
            }}
            className="btn cancel_edit"
          >
            Cancel Edit
          </button>
        )}
      </div>
    </>
  );
};

export default Form;
