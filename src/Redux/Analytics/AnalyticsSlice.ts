import { INITIAL_ANALYTICS } from './InitialState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestsPerSecondAnalytics } from '../../Models/Analytics/RequestsPerSecondAnalytics';
import { NumberOfRequestsAnalytics } from '../../Models/Analytics/NumberOfRequestsAnalytics';
import { ResponseTimesAnalytics } from '../../Models/Analytics/ResponseTimesAnalytics';
import { AverageAnalytics } from '../../Models/Analytics/AverageAnalytics';

export const analyticsSlice = createSlice({
  name: 'analytics',
  initialState: INITIAL_ANALYTICS,
  reducers: {
    setAverageAnalytics: (state, action: PayloadAction<AverageAnalytics>) => {
      state.averageAnalytics = action.payload;
    },
    setMethodsResponseTimesAnalytics: (state, action: PayloadAction<ResponseTimesAnalytics[]>) => {
      state.methodsResponseTimesAnalytics = action.payload;
    },
    setMethodsNumberOfRequestsAnalytics: (state, action: PayloadAction<NumberOfRequestsAnalytics[]>) => {
      state.methodsNumberOfRequestsAnalytics = action.payload;
    },
    setMethodsRequestsPerSecondAnalytics: (state, action: PayloadAction<RequestsPerSecondAnalytics[]>) => {
      state.methodsRequestsPerSecondAnalytics = action.payload;
    },
    setResultsResponseTimesAnalytics: (state, action: PayloadAction<ResponseTimesAnalytics[]>) => {
      state.resultsResponseTimesAnalytics = action.payload;
    },
    setResultsNumberOfRequestsAnalytics: (state, action: PayloadAction<NumberOfRequestsAnalytics[]>) => {
      state.resultsNumberOfRequestsAnalytics = action.payload;
    },
    setResultsRequestsPerSecondAnalytics: (state, action: PayloadAction<RequestsPerSecondAnalytics[]>) => {
      state.resultsRequestsPerSecondAnalytics = action.payload;
    },
    clearAnalyticsState: () => INITIAL_ANALYTICS
  }
});

export const {
  clearAnalyticsState,
  setAverageAnalytics,
  setMethodsResponseTimesAnalytics,
  setMethodsNumberOfRequestsAnalytics,
  setMethodsRequestsPerSecondAnalytics,
  setResultsResponseTimesAnalytics,
  setResultsNumberOfRequestsAnalytics,
  setResultsRequestsPerSecondAnalytics
} = analyticsSlice.actions;

export default analyticsSlice.reducer;
