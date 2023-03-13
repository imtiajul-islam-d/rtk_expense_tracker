import React from "react";
import editIcon from "./../../../images/edit.svg";
import deleteIcon from "./../../../images/delete.svg";
import { useDispatch } from "react-redux";
import { editing } from "../../../features/transaction/transactionSlice";

const Transaction = ({ item, setEdit }) => {
  const { name, amount, type } = item || {};
  const dispatch = useDispatch();
  return (
    <>
      <li className={`transaction ${type}`}>
        <p>{name}</p>
        <div className="right">
          <p>৳ {amount}</p>
          <button
            onClick={() => {
              dispatch(editing(item));
              setEdit(true);
            }}
            className="link"
          >
            <img className="icon" src={editIcon} alt="Edit" />
          </button>
          <button className="link">
            <img className="icon" src={deleteIcon} alt="delete" />
          </button>
        </div>
      </li>
    </>
  );
};

export default Transaction;
