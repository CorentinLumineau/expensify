import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CompoundInterestState {
  principal: number;
  monthlyInvestment: number;
  rate: number;
  time: number;
  compound: string;
  withdrawRate: number;
}

const initialState: CompoundInterestState = {
  principal: 1000,
  monthlyInvestment: 500,
  rate: 8,
  time: 20,
  compound: "1",
  withdrawRate: 4
};

export const compoundInterestSlice = createSlice({
  name: 'compoundInterest',
  initialState,
  reducers: {
    updateState: (state, action: PayloadAction<Partial<CompoundInterestState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateState } = compoundInterestSlice.actions;

export default compoundInterestSlice.reducer;