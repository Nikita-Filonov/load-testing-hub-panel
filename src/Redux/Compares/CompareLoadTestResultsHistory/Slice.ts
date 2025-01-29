import { INITIAL_COMPARE_LOAD_TEST_RESULTS_HISTORY } from './InitialState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  CompareResultsHistoryNumberOfRequests,
  CompareResultsHistoryNumberOfUsers,
  CompareResultsHistoryRequestsPerSecond,
  CompareResultsHistoryResponseTimes
} from '../../../Models/Compares/CompareResultsHistory';

export const slice = createSlice({
  name: 'compareLoadTestResultsHistory',
  initialState: INITIAL_COMPARE_LOAD_TEST_RESULTS_HISTORY,
  reducers: {
    setCompareLoadTestResultsHistoryResponseTimes: (
      state,
      action: PayloadAction<CompareResultsHistoryResponseTimes[]>
    ) => {
      state.compareLoadTestResultsHistoryResponseTimes = action.payload;
    },
    setCompareLoadTestResultsHistoryNumberOfUsers: (
      state,
      action: PayloadAction<CompareResultsHistoryNumberOfUsers[]>
    ) => {
      state.compareLoadTestResultsHistoryNumberOfUsers = action.payload;
    },
    setCompareLoadTestResultsHistoryNumberOfRequests: (
      state,
      action: PayloadAction<CompareResultsHistoryNumberOfRequests[]>
    ) => {
      state.compareLoadTestResultsHistoryNumberOfRequests = action.payload;
    },
    setCompareLoadTestResultsHistoryRequestsPerSecond: (
      state,
      action: PayloadAction<CompareResultsHistoryRequestsPerSecond[]>
    ) => {
      state.compareLoadTestResultsHistoryRequestsPerSecond = action.payload;
    }
  }
});

export const {
  setCompareLoadTestResultsHistoryResponseTimes,
  setCompareLoadTestResultsHistoryNumberOfUsers,
  setCompareLoadTestResultsHistoryNumberOfRequests,
  setCompareLoadTestResultsHistoryRequestsPerSecond
} = slice.actions;

export default slice.reducer;
