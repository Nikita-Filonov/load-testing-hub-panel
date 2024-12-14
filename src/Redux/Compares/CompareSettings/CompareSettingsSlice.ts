import { CompareSettingsInitialState, INITIAL_COMPARE_SETTINGS } from './InitialState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CompareSettings } from '../../../Models/Compares/CompareSettings';
import { CompareWidgetSettings, CompareWidgetType } from '../../../Models/Compares/CompareTableSettings';
import { PersistConfig } from 'redux-persist/es/types';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

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

const persistConfig: PersistConfig<CompareSettingsInitialState> = {
  key: 'compareSettings',
  storage,
  whitelist: ['compareWidgetsSettings']
};

export const { setCompareSettings, setCompareWidgetSettings } = compareSettingsSlice.actions;

export default persistReducer(persistConfig, compareSettingsSlice.reducer);
