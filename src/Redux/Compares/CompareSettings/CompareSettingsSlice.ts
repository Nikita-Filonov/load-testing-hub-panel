import { INITIAL_COMPARE_SETTINGS } from './InitialState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CompareSettings } from '../../../Models/Compares/CompareSettings';
import { CompareWidgetSettings, CompareWidgetType } from '../../../Models/Compares/CompareTableSettings';

type SetCompareWidgetSettings = {
  type: CompareWidgetType;
  settings: CompareWidgetSettings;
};

export const compareSettingsSlice = createSlice({
  name: 'compareSettings',
  initialState: INITIAL_COMPARE_SETTINGS,
  reducers: {
    setCompareSettings: (state, action: PayloadAction<CompareSettings>) => {
      state.compareSettings = action.payload;
    },
    setCompareWidgetSettings: (state, action: PayloadAction<SetCompareWidgetSettings>) => {
      state.compareWidgetsSettings = {
        ...state.compareWidgetsSettings,
        [action.payload.type]: action.payload.settings
      };
    }
  }
});

export const { setCompareSettings, setCompareWidgetSettings } = compareSettingsSlice.actions;

export default compareSettingsSlice.reducer;
