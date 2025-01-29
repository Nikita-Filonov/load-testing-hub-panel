import { INITIAL_METHOD_RESULTS_HISTORY } from './InitialState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResultsHistory } from '../../../Models/Results/ResultsHistory';

export const slice = createSlice({
  name: 'methodResultsHistory',
  initialState: INITIAL_METHOD_RESULTS_HISTORY,
  reducers: {
    setMethodResultsHistory: (state, action: PayloadAction<ResultsHistory[]>) => {
      state.methodResultsHistory = action.payload;
    }
  }
});

export const { setMethodResultsHistory } = slice.actions;

export default slice.reducer;
