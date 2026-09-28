import { CoreInitialState, INITIAL_CORE } from './InitialState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThemeSettings } from '../../Models/Core/Theme';
import { TableSettings, TableType } from '../../Models/Core/TableSettings';
import { ChartSettings, ChartType, ChartWidgetSettings, ChartWidgetType } from '../../Models/Core/ChartSettings';
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

export const {
  setTheme,
  setTableSettings,
  setChartSettings,
  setValidationErrors,
  clearValidationErrors,
  setChartWidgetSettings
} = slice.actions;

export default slice.reducer;
