import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getTransactions,
  addTransaction,
  editTransaction,
  deleteTransaction,
} from "./transactionAPI";

// initial state
const initialState = {
  transactions: [],
  isLoading: false,
  isError: false,
  error: "",
  edit: null,
};

// async thunks
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

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    editing: (state, action) => {
      state.edit = action.payload;
    },
    editEnd: (state, action) => {
      state.edit = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransaction.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
        state.error = "";
      })
      .addCase(fetchTransaction.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.error = "";
        state.transactions = action.payload;
      })
      .addCase(fetchTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
        state.transactions = [];
      })
      .addCase(createTransaction.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
        state.error = "";
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.error = "";
        state.transactions.push(action.payload);
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      })
      .addCase(modifyTransaction.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
        state.error = "";
      })
      .addCase(modifyTransaction.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.error = "";
        const indexToUpdate = state.transactions.findIndex(
          (t) => t.id === action.payload.id
        );
        state.transactions[indexToUpdate] = action.payload;
      })
      .addCase(modifyTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      })
      .addCase(delTransaction.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
        state.error = "";
      })
      .addCase(delTransaction.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.error = "";
        state.transactions = state.transactions.filter(
          (t) => t.id !== action?.meta?.arg
        );
      })
      .addCase(delTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      });
  },
});

export default transactionSlice.reducer;
export const { editing, editEnd } = transactionSlice.actions;
