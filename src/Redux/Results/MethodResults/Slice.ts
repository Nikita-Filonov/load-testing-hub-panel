import { INITIAL_METHOD_RESULTS } from './InitialState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MethodResult, MethodResultDetails } from '../../../Models/Results/MethodResults';

export const slice = createSlice({
  name: 'methodResults',
  initialState: INITIAL_METHOD_RESULTS,
  reducers: {
    setMethodResults: (state, action: PayloadAction<MethodResult[]>) => {
      state.methodResults = action.payload;
    },
    setMethodResultDetails: (state, action: PayloadAction<MethodResultDetails>) => {
      state.methodResultDetails = action.payload;
    }
  }
});

export const { setMethodResults, setMethodResultDetails } = slice.actions;

export default slice.reducer;
