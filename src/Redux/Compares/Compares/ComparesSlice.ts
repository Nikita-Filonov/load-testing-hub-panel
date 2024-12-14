import { INITIAL_COMPARES } from './InitialState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CompareHistoryResults } from '../../../Models/Compares/CompareHistoryResults';
import {
  CompareResultWithResults,
  CompareResultWithResultsAverageSummary
} from '../../../Models/Compares/CompareResultWithResults';
import { CompareResultWithAverages } from '../../../Models/Compares/CompareResultWithAverages';
import { CompareResultWithScenario } from '../../../Models/Compares/CompareResultWithScenario';
import { LoadTestResultCompare, MethodResultCompare } from '../../../Models/Compares/Compares';

export const comparesSlice = createSlice({
  name: 'compares',
  initialState: INITIAL_COMPARES,
  reducers: {
    setCompareHistoryResults: (state, action: PayloadAction<CompareHistoryResults[]>) => {
      state.compareHistoryResults = action.payload;
    },
    setCompareResultWithResults: (state, action: PayloadAction<CompareResultWithResults[]>) => {
      state.compareResultWithResults = action.payload;
    },
    setCompareResultWithAverages: (state, action: PayloadAction<CompareResultWithAverages>) => {
      state.compareResultWithAverages = action.payload;
    },
    setCompareResultWithScenario: (state, action: PayloadAction<CompareResultWithScenario>) => {
      state.compareResultWithScenario = action.payload;
    },
    setCompareMethodWithScenario: (state, action: PayloadAction<MethodResultCompare>) => {
      state.compareMethodWithScenario = action.payload;
    },
    setCompareAveragesWithScenario: (state, action: PayloadAction<LoadTestResultCompare>) => {
      state.compareAveragesWithScenario = action.payload;
    },
    setCompareResultWithResultsAverageSummary: (
      state,
      action: PayloadAction<CompareResultWithResultsAverageSummary>
    ) => {
      state.compareResultWithResultsAverageSummary = action.payload;
    }
  }
});

export const {
  setCompareHistoryResults,
  setCompareResultWithResults,
  setCompareResultWithAverages,
  setCompareResultWithScenario,
  setCompareMethodWithScenario,
  setCompareAveragesWithScenario,
  setCompareResultWithResultsAverageSummary
} = comparesSlice.actions;

export default comparesSlice.reducer;
