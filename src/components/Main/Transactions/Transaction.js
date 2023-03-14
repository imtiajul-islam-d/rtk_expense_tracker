import React from "react";
import editIcon from "./../../../images/edit.svg";
import deleteIcon from "./../../../images/delete.svg";
import { useDispatch } from "react-redux";
import {
  delTransaction,
  editing,
} from "../../../features/transaction/transactionSlice";
import numberWithCommas from "../../../utils/thousandSeparators";

const Transaction = ({ item, setEditMode }) => {
  const { id, name, amount, type } = item || {};
  const dispatch = useDispatch();
  return (
    <>
      <li className={`transaction ${type}`}>
        <p>{name}</p>
        <div className="right">
          <p>৳ {numberWithCommas(amount)}</p>
          <button
            onClick={() => {
              dispatch(editing(item));
              setEditMode(true);
            }}
            className="link"
          >
            <img className="icon" src={editIcon} alt="Edit" />
          </button>
          <button onClick={() => dispatch(delTransaction(id))} className="link">
            <img className="icon" src={deleteIcon} alt="delete" />
          </button>
        </div>
      </li>
    </>
  );
};

export default Transaction;
