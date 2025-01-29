import { INITIAL_COMPARE_RESULT_WITH_SCENARIO } from './InitialState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CompareResultWithScenario } from '../../../Models/Compares/CompareResultWithScenario';

export const slice = createSlice({
  name: 'compareResultWithScenario',
  initialState: INITIAL_COMPARE_RESULT_WITH_SCENARIO,
  reducers: {
    setCompareResultWithScenario: (state, action: PayloadAction<CompareResultWithScenario>) => {
      state.compareResultWithScenario = action.payload;
    }
  }
});

export const { setCompareResultWithScenario } = slice.actions;

export default slice.reducer;
