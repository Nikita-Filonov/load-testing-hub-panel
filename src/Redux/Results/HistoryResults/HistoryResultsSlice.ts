import { INITIAL_HISTORY_RESULTS } from './InitialState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HistoryResult } from '../../../Models/Results/HistoryResults';

export const historyResultsSlice = createSlice({
  name: 'historyResults',
  initialState: INITIAL_HISTORY_RESULTS,
  reducers: {
    setHistoryResults: (state, action: PayloadAction<HistoryResult[]>) => {
      state.historyResults = action.payload;
    }
  }
});

export const { setHistoryResults } = historyResultsSlice.actions;

export default historyResultsSlice.reducer;
