import { INITIAL_RATIO_RESULTS } from './InitialState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RatioResult } from '../../../Models/Results/RatioResults';

export const ratioResultsSlice = createSlice({
  name: 'ratioResults',
  initialState: INITIAL_RATIO_RESULTS,
  reducers: {
    setRatioResultsTotal: (state, action: PayloadAction<RatioResult[]>) => {
      state.ratioResultsTotal = action.payload;
    },
    setRatioResultsPerClass: (state, action: PayloadAction<RatioResult[]>) => {
      state.ratioResultsPerClass = action.payload;
    }
  }
});

export const { setRatioResultsTotal, setRatioResultsPerClass } = ratioResultsSlice.actions;

export default ratioResultsSlice.reducer;
