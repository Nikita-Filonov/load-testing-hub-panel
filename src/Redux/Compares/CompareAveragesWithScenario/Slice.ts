import { INITIAL_COMPARE_AVERAGES_WITH_SCENARIO } from './InitialState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoadTestResultCompare } from '../../../Models/Compares/Compares';

export const slice = createSlice({
  name: 'compareAveragesWithScenario',
  initialState: INITIAL_COMPARE_AVERAGES_WITH_SCENARIO,
  reducers: {
    setCompareAveragesWithScenario: (state, action: PayloadAction<LoadTestResultCompare>) => {
      state.compareAveragesWithScenario = action.payload;
    }
  }
});

export const { setCompareAveragesWithScenario } = slice.actions;

export default slice.reducer;
