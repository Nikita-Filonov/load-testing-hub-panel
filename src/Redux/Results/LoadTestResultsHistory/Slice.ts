import { INITIAL_LOAD_TEST_RESULTS_HISTORY } from './InitialState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResultsHistory } from '../../../Models/Results/ResultsHistory';

export const slice = createSlice({
  name: 'loadTestResultsHistory',
  initialState: INITIAL_LOAD_TEST_RESULTS_HISTORY,
  reducers: {
    setLoadTestResultsHistory: (state, action: PayloadAction<ResultsHistory[]>) => {
      state.loadTestResultsHistory = action.payload;
    }
  }
});

export const { setLoadTestResultsHistory } = slice.actions;

export default slice.reducer;
