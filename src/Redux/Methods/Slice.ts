import { INITIAL_METHODS } from './InitialState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Method, MethodDetails, ShortMethod } from '../../Models/Methods/Methods';
import { PercentilesAnalytics } from '../../Models/Analytics/PercentilesAnalytics';
import { ResponseTimesAnalytics } from '../../Models/Analytics/ResponseTimesAnalytics';
import { RequestsPerSecondAnalytics } from '../../Models/Analytics/RequestsPerSecondAnalytics';
import { NumberOfRequestsAnalytics } from '../../Models/Analytics/NumberOfRequestsAnalytics';

export const slice = createSlice({
  name: 'methods',
  initialState: INITIAL_METHODS,
  reducers: {
    setMethods: (state, action: PayloadAction<Method[]>) => {
      state.methods = action.payload;
    },
    setShortMethods: (state, action: PayloadAction<ShortMethod[]>) => {
      state.shortMethods = action.payload;
    },
    setMethodDetails: (state, action: PayloadAction<MethodDetails>) => {
      state.methodDetails = action.payload;
    },
    setMethodDetailsPercentilesAnalytics: (state, action: PayloadAction<PercentilesAnalytics[]>) => {
      state.methodDetailsPercentilesAnalytics = action.payload;
    },
    setMethodDetailsResponseTimesAnalytics: (state, action: PayloadAction<ResponseTimesAnalytics[]>) => {
      state.methodDetailsResponseTimesAnalytics = action.payload;
    },
    setMethodDetailsNumberOfRequestsAnalytics: (state, action: PayloadAction<NumberOfRequestsAnalytics[]>) => {
      state.methodDetailsNumberOfRequestsAnalytics = action.payload;
    },
    setMethodDetailsRequestsPerSecondAnalytics: (state, action: PayloadAction<RequestsPerSecondAnalytics[]>) => {
      state.methodDetailsRequestsPerSecondAnalytics = action.payload;
    },
    clearMethodsState: () => INITIAL_METHODS
  }
});

export const {
  setMethods,
  setShortMethods,
  setMethodDetails,
  setMethodDetailsPercentilesAnalytics,
  setMethodDetailsResponseTimesAnalytics,
  setMethodDetailsNumberOfRequestsAnalytics,
  setMethodDetailsRequestsPerSecondAnalytics,
  clearMethodsState
} = slice.actions;

export default slice.reducer;
