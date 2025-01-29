import { INITIAL_COMPARE_METHOD_RESULTS_HISTORY } from './InitialState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  CompareResultsHistoryNumberOfRequests,
  CompareResultsHistoryNumberOfUsers,
  CompareResultsHistoryRequestsPerSecond,
  CompareResultsHistoryResponseTimes
} from '../../../Models/Compares/CompareResultsHistory';

export const slice = createSlice({
  name: 'compareMethodResultsHistory',
  initialState: INITIAL_COMPARE_METHOD_RESULTS_HISTORY,
  reducers: {
    setCompareMethodResultsHistoryResponseTimes: (
      state,
      action: PayloadAction<CompareResultsHistoryResponseTimes[]>
    ) => {
      state.compareMethodResultsHistoryResponseTimes = action.payload;
    },
    setCompareMethodResultsHistoryNumberOfUsers: (
      state,
      action: PayloadAction<CompareResultsHistoryNumberOfUsers[]>
    ) => {
      state.compareMethodResultsHistoryNumberOfUsers = action.payload;
    },
    setCompareMethodResultsHistoryNumberOfRequests: (
      state,
      action: PayloadAction<CompareResultsHistoryNumberOfRequests[]>
    ) => {
      state.compareMethodResultsHistoryNumberOfRequests = action.payload;
    },
    setCompareMethodResultsHistoryRequestsPerSecond: (
      state,
      action: PayloadAction<CompareResultsHistoryRequestsPerSecond[]>
    ) => {
      state.compareMethodResultsHistoryRequestsPerSecond = action.payload;
    }
  }
});

export const {
  setCompareMethodResultsHistoryResponseTimes,
  setCompareMethodResultsHistoryNumberOfUsers,
  setCompareMethodResultsHistoryNumberOfRequests,
  setCompareMethodResultsHistoryRequestsPerSecond
} = slice.actions;

export default slice.reducer;
