import { INITIAL_COMPARE_RESULT_WITH_RESULTS } from './InitialState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  CompareResultWithResults,
  CompareResultWithResultsAverageSummary
} from '../../../Models/Compares/CompareResultWithResults';

export const slice = createSlice({
  name: 'compareResultWithResults',
  initialState: INITIAL_COMPARE_RESULT_WITH_RESULTS,
  reducers: {
    setCompareResultWithResults: (state, action: PayloadAction<CompareResultWithResults[]>) => {
      state.compareResultWithResults = action.payload;
    },
    setCompareResultWithResultsAverageSummary: (
      state,
      action: PayloadAction<CompareResultWithResultsAverageSummary>
    ) => {
      state.compareResultWithResultsAverageSummary = action.payload;
    }
  }
});

export const { setCompareResultWithResults, setCompareResultWithResultsAverageSummary } = slice.actions;

export default slice.reducer;
