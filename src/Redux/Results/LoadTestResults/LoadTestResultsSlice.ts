import { INITIAL_LOAD_TEST_RESULTS } from './InitialState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  LoadTestResult,
  LoadTestResultDetails,
  LoadTestResultScenarioCompare
} from '../../../Models/Results/LoadTestResults';

export const loadTestResultsSlice = createSlice({
  name: 'loadTestResults',
  initialState: INITIAL_LOAD_TEST_RESULTS,
  reducers: {
    setLoadTestResults: (state, action: PayloadAction<LoadTestResult[]>) => {
      state.loadTestResults = action.payload;
    },
    setLoadTestResultsTotal: (state, action: PayloadAction<number>) => {
      state.loadTestResultsTotal = action.payload;
    },
    setLoadTestResultDetails: (state, action: PayloadAction<LoadTestResultDetails>) => {
      state.loadTestResultDetails = action.payload;
    },
    setLoadTestResultScenarioCompare: (state, action: PayloadAction<LoadTestResultScenarioCompare>) => {
      state.loadTestResultScenarioCompare = action.payload;
    }
  }
});

export const {
  setLoadTestResults,
  setLoadTestResultsTotal,
  setLoadTestResultDetails,
  setLoadTestResultScenarioCompare
} = loadTestResultsSlice.actions;

export default loadTestResultsSlice.reducer;
