import { INITIAL_METHODS } from './InitialState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Method, MethodDetails, ShortMethod } from '../../../Models/Results/Methods';

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
    clearMethodsState: () => INITIAL_METHODS
  }
});

export const { setMethods, setShortMethods, setMethodDetails, clearMethodsState } = methodsSlice.actions;

export default methodsSlice.reducer;
