import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CompoundInterestState {
  principal: number;
  monthlyInvestment: number;
  rate: number;
  time: number;
  compound: string;
  withdrawRate: number;
  total: number; // New field for total
}

const initialState: CompoundInterestState = {
  principal: 1000,
  monthlyInvestment: 500,
  rate: 8,
  time: 20,
  compound: "1",
  withdrawRate: 4,
  total: 0, // Initialize total
};

export const compoundInterestSlice = createSlice({
  name: 'compoundInterest',
  initialState,
  reducers: {
    updateState: (state, action: PayloadAction<Partial<CompoundInterestState>>) => {
      const newState = { ...state, ...action.payload };
      // Calculate total (interest + capital)
      newState.total = newState.principal + (newState.monthlyInvestment * 12 * newState.time);
      return newState;
    },
  },
});

export const { updateState } = compoundInterestSlice.actions;

export default compoundInterestSlice.reducer;