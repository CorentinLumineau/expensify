import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AssetClassType = 'Cash' | 'RealEstate' | 'Crypto' | 'Stock' | 'Gold';

export interface AssetAllocation {
  type: AssetClassType;
  percentageWithoutCash: number;
  percentageWithCash: number;
}

interface AssetClassState {
  totalAmount: number;
  cashAmount: number;
  allocations: AssetAllocation[];
}

const initialState: AssetClassState = {
  totalAmount: 100000,
  cashAmount: 0,
  allocations: [
    { type: 'Cash', percentageWithoutCash: 0, percentageWithCash: 0 },
    { type: 'RealEstate', percentageWithoutCash: 25, percentageWithCash: 25 },
    { type: 'Crypto', percentageWithoutCash: 30, percentageWithCash: 30 },
    { type: 'Stock', percentageWithoutCash: 40, percentageWithCash: 40 },
    { type: 'Gold', percentageWithoutCash: 5, percentageWithCash: 5 },
  ],
};

const assetClassSlice = createSlice({
  name: 'assetClass',
  initialState,
  reducers: {
    setTotalAmount: (state, action: PayloadAction<number>) => {
      state.totalAmount = action.payload;
    },
    setCashAmount: (state, action: PayloadAction<number>) => {
      state.cashAmount = action.payload;
    },
    updateAllocation: (state, action: PayloadAction<AssetAllocation>) => {
      const index = state.allocations.findIndex(a => a.type === action.payload.type);
      if (index !== -1) {
        state.allocations[index] = action.payload;
      }
    },
    recalculateAllocations: (state) => {
      const cashPercentage = (state.cashAmount / state.totalAmount) * 100;
      const remainingPercentage = 100 - cashPercentage;
      state.allocations = state.allocations.map(asset => {
        if (asset.type === 'Cash') {
          return {
            ...asset,
            percentageWithoutCash: 0,
            percentageWithCash: cashPercentage
          };
        } else {
          const newPercentageWithCash = (asset.percentageWithoutCash / 100) * remainingPercentage;
          return {
            ...asset,
            percentageWithCash: newPercentageWithCash
          };
        }
      });
    },
  },
});

export const { setTotalAmount, setCashAmount, updateAllocation, recalculateAllocations } = assetClassSlice.actions;
export default assetClassSlice.reducer;