import React from "react";
import edit from "./../../../images/edit.svg"
import deleteIcon from "./../../../images/delete.svg"

const Transactions = () => {
  return (
    <>
      <p className="second_heading">Your Transactions:</p>
      <div className="conatiner_of_list_of_transactions">
        <ul>
          <li className="transaction income">
            <p>Earned this month</p>
            <div className="right">
              <p>৳ 100</p>
              <button className="link">
                <img className="icon" src={edit} alt="Edit" />
              </button>
              <button className="link">
                <img className="icon" src={deleteIcon} alt="delete" />
              </button>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Transactions;
