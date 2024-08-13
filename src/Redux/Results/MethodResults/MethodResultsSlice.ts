import { INITIAL_METHOD_RESULTS } from './InitialState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MethodResult, MethodResultCompare, MethodResultScenarioCompare } from '../../../Models/Results/MethodResults';

export const methodResultsSlice = createSlice({
  name: 'methodResults',
  initialState: INITIAL_METHOD_RESULTS,
  reducers: {
    setMethodResults: (state, action: PayloadAction<MethodResult[]>) => {
      state.methodResults = action.payload;
    },
    setMethodResultsCompares: (state, action: PayloadAction<MethodResultCompare[]>) => {
      state.methodResultsCompares = action.payload;
    },
    setMethodResultScenarioCompares: (state, action: PayloadAction<MethodResultScenarioCompare[]>) => {
      state.methodResultScenarioCompares = action.payload;
    }
  }
});

export const { setMethodResults, setMethodResultsCompares, setMethodResultScenarioCompares } =
  methodResultsSlice.actions;

export default methodResultsSlice.reducer;
