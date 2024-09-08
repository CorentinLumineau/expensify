import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Transaction {
  name: string;
  amount: number;
  percentage: number;
}

interface DebtRatioState {
  expenses: Transaction[];
  incomes: Transaction[];
}

const initialState: DebtRatioState = {
  expenses: [],
  incomes: [],
};

const debtRatioSlice = createSlice({
  name: 'debtRatio',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<{ type: 'expense' | 'income', transaction: Transaction }>) => {
      const { type, transaction } = action.payload;
      if (type === 'expense') {
        state.expenses.push(transaction);
      } else {
        state.incomes.push(transaction);
      }
    },
    removeTransaction: (state, action: PayloadAction<{ type: 'expense' | 'income', index: number }>) => {
      const { type, index } = action.payload;
      if (type === 'expense') {
        state.expenses.splice(index, 1);
      } else {
        state.incomes.splice(index, 1);
      }
    },
  },
});

export const { addTransaction, removeTransaction } = debtRatioSlice.actions;
export default debtRatioSlice.reducer;