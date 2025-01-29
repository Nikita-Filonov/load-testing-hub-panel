import { INITIAL_COMPARE_RESULT_WITH_AVERAGES } from './InitialState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CompareResultWithAverages } from '../../../Models/Compares/CompareResultWithAverages';

export const slice = createSlice({
  name: 'compareResultWithAverages',
  initialState: INITIAL_COMPARE_RESULT_WITH_AVERAGES,
  reducers: {
    setCompareResultWithAverages: (state, action: PayloadAction<CompareResultWithAverages>) => {
      state.compareResultWithAverages = action.payload;
    }
  }
});

export const { setCompareResultWithAverages } = slice.actions;

export default slice.reducer;
