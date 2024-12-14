import { INITIAL_LOAD_TEST_RESULTS } from './InitialState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoadTestResult, LoadTestResultDetails } from '../../../Models/Results/LoadTestResults';

type DeleteLoadTestResult = {
  loadTestResultId: number;
};

export const loadTestResultsSlice = createSlice({
  name: 'loadTestResults',
  initialState: INITIAL_LOAD_TEST_RESULTS,
  reducers: {
    setLoadTestResults: (state, action: PayloadAction<LoadTestResult[]>) => {
      state.loadTestResults = action.payload;
    },
    updateLoadTestResult: (state, action: PayloadAction<LoadTestResult>) => {
      const newResult = action.payload;
      state.loadTestResults = state.loadTestResults.map((result) => (result.id === newResult.id ? newResult : result));
    },
    deleteLoadTestResult: (state, action: PayloadAction<DeleteLoadTestResult>) => {
      state.loadTestResults = state.loadTestResults.filter((result) => result.id !== action.payload.loadTestResultId);
      state.loadTestResultsTotal -= 1;
    },
    setLoadTestResultsTotal: (state, action: PayloadAction<number>) => {
      state.loadTestResultsTotal = action.payload;
    },
    setLoadTestResultDetails: (state, action: PayloadAction<LoadTestResultDetails>) => {
      state.loadTestResultDetails = action.payload;
    },
    clearLoadTestResultsState: () => INITIAL_LOAD_TEST_RESULTS
  }
});

export const {
  setLoadTestResults,
  updateLoadTestResult,
  deleteLoadTestResult,
  setLoadTestResultsTotal,
  setLoadTestResultDetails,
  clearLoadTestResultsState
} = loadTestResultsSlice.actions;

export default loadTestResultsSlice.reducer;
