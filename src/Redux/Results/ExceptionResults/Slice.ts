import { INITIAL_EXCEPTION_RESULTS } from './InitialState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ExceptionResult, ExceptionResultDetails } from '../../../Models/Results/ExceptionResults';

export const slice = createSlice({
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

export const { setExceptionResults, setExceptionResultDetails } = slice.actions;

export default slice.reducer;
