import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Transaction {
  id: string; // Add an id field for easier updates
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
    updateTransaction: (state, action: PayloadAction<{ type: 'expense' | 'income', transaction: Transaction }>) => {
      const { type, transaction } = action.payload;
      const array = type === 'expense' ? state.expenses : state.incomes;
      const index = array.findIndex(t => t.id === transaction.id);
      if (index !== -1) {
        array[index] = transaction;
      }
    },
    removeTransaction: (state, action: PayloadAction<{ type: 'expense' | 'income', id: string }>) => {
      const { type, id } = action.payload;
      if (type === 'expense') {
        state.expenses = state.expenses.filter(t => t.id !== id);
      } else {
        state.incomes = state.incomes.filter(t => t.id !== id);
      }
    },
  },
});

export const { addTransaction, updateTransaction, removeTransaction } = debtRatioSlice.actions;
export default debtRatioSlice.reducer;