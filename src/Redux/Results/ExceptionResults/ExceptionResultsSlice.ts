import { INITIAL_EXCEPTION_RESULTS } from './InitialState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ExceptionResult, ExceptionResultDetails } from '../../../Models/Results/ExceptionResults';

export const exceptionResultsSlice = createSlice({
  name: 'exceptionResults',
  initialState: INITIAL_EXCEPTION_RESULTS,
  reducers: {
    setExceptionResults: (state, action: PayloadAction<ExceptionResult[]>) => {
      state.exceptionResults = action.payload;
    },
    setExceptionResultDetails: (state, action: PayloadAction<ExceptionResultDetails>) => {
      state.exceptionResultDetails = action.payload;
    }
  }
});

export const { setExceptionResults, setExceptionResultDetails } = exceptionResultsSlice.actions;

export default exceptionResultsSlice.reducer;
