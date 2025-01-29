import { CoreInitialState, INITIAL_CORE } from './InitialState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PersistConfig } from 'redux-persist/es/types';
import storage from 'redux-persist/lib/storage';
import { createMigrate, persistReducer } from 'redux-persist';
import { ThemeSettings } from '../../Models/Core/Theme';
import { TableSettings, TableType } from '../../Models/Core/TableSettings';
import { ChartSettings, ChartType, ChartWidgetSettings, ChartWidgetType } from '../../Models/Core/ChartSettings';
import { CORE_MIGRATIONS } from './Migrations';
import { ValidationError } from '../../Services/Clients/Models';

type SetTableSettings<Data> = {
  type: TableType;
  settings: TableSettings<Data>;
};

type SetChartSettings<Data> = {
  type: ChartType;
  settings: ChartSettings<Data>;
};

type SetValidationErrors = {
  key: string;
  errors: ValidationError[];
};

type ClearValidationErrors = {
  key: string;
};

type SetChartWidgetSettings<Data> = {
  type: ChartWidgetType;
  settings: ChartWidgetSettings<Data>;
};

export const slice = createSlice({
  name: 'core',
  initialState: INITIAL_CORE,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeSettings>) => {
      state.theme = action.payload;
    },
    setTableSettings: <Data>(state: CoreInitialState, action: PayloadAction<SetTableSettings<Data>>) => {
      state.tableSettings[action.payload.type] = action.payload.settings as never;
    },
    setChartSettings: <Data>(state: CoreInitialState, action: PayloadAction<SetChartSettings<Data>>) => {
      state.chartSettings[action.payload.type] = action.payload.settings as never;
    },
    setValidationErrors: (state, action: PayloadAction<SetValidationErrors>) => {
      state.validationErrors[action.payload.key] = action.payload.errors;
    },
    clearValidationErrors: (state, action: PayloadAction<ClearValidationErrors>) => {
      state.validationErrors[action.payload.key] = [];
    },
    setChartWidgetSettings: <Data>(state: CoreInitialState, action: PayloadAction<SetChartWidgetSettings<Data>>) => {
      state.chartWidgetSettings[action.payload.type] = action.payload.settings as never;
    }
  }
});

const persistConfig: PersistConfig<CoreInitialState> = {
  key: 'core',
  storage,
  version: 1,
  migrate: createMigrate(CORE_MIGRATIONS, { debug: false }),
  whitelist: ['theme', 'tableSettings', 'chartSettings', 'chartWidgetSettings']
};

export const {
  setTheme,
  setTableSettings,
  setChartSettings,
  setValidationErrors,
  clearValidationErrors,
  setChartWidgetSettings
} = slice.actions;

export default persistReducer(persistConfig, slice.reducer);
