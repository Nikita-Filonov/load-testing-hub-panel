import { INITIAL_METHODS } from './InitialState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Method, MethodDetails, MethodScenarioCompare, ShortMethod } from '../../../Models/Results/Methods';

export const methodsSlice = createSlice({
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
    setMethodScenarioCompare: (state, action: PayloadAction<MethodScenarioCompare>) => {
      state.methodScenarioCompare = action.payload;
    }
  }
});

export const { setMethods, setShortMethods, setMethodDetails, setMethodScenarioCompare } = methodsSlice.actions;

export default methodsSlice.reducer;
