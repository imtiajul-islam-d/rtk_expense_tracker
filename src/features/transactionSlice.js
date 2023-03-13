import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getTransactions,
  addTransaction,
  editTransaction,
  deleteTransaction,
} from "./transaction/transactionAPI";

// initial state
const initialState = {
  transactions: [],
  isLoading: false,
  isError: false,
  error: "",
};

export const fetchTransaction = createAsyncThunk(
  "transaction/fetchTransaction",
  async () => {
    const transaction = await getTransactions();
    return transaction;
  }
);
export const createTransaction = createAsyncThunk(
  "transaction/createTransaction",
  async (data) => {
    const transaction = await addTransaction(data);
    return transaction;
  }
);
export const modifyTransaction = createAsyncThunk(
  "transaction/modifyTransaction",
  async ({ id, data }) => {
    const transaction = await editTransaction(id, data);
    return transaction;
  }
);
export const delTransaction = createAsyncThunk(
  "transaction/delTransaction",
  async (id) => {
    const transaction = await deleteTransaction(id);
    return transaction;
  }
);
