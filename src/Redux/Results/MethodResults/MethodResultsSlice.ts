import { INITIAL_METHOD_RESULTS } from './InitialState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MethodResult } from '../../../Models/Results/MethodResults';

export const methodResultsSlice = createSlice({
  name: 'methodResults',
  initialState: INITIAL_METHOD_RESULTS,
  reducers: {
    setMethodResults: (state, action: PayloadAction<MethodResult[]>) => {
      state.methodResults = action.payload;
    }
  }
});

export const { setMethodResults } = methodResultsSlice.actions;

export default methodResultsSlice.reducer;
