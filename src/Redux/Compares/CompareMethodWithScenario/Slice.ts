import { INITIAL_COMPARE_METHOD_WITH_SCENARIO } from './InitialState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MethodResultCompare } from '../../../Models/Compares/Compares';

export const slice = createSlice({
  name: 'compareMethodWithScenario',
  initialState: INITIAL_COMPARE_METHOD_WITH_SCENARIO,
  reducers: {
    setCompareMethodWithScenario: (state, action: PayloadAction<MethodResultCompare>) => {
      state.compareMethodWithScenario = action.payload;
    }
  }
});

export const { setCompareMethodWithScenario } = slice.actions;

export default slice.reducer;
