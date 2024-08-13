import { INITIAL_SCENARIOS, ScenariosInitialState } from './InitialState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PersistConfig } from 'redux-persist/es/types';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { Scenario, ScenarioDetails } from '../../../Models/Services/Scenarios';
import { ScenarioSettings } from '../../../Models/Services/ScenarioSettings';

export const scenariosSlice = createSlice({
  name: 'scenarios',
  initialState: INITIAL_SCENARIOS,
  reducers: {
    setScenario: (state, action: PayloadAction<Scenario>) => {
      state.scenario = action.payload;
    },
    setScenarios: (state, action: PayloadAction<Scenario[]>) => {
      state.scenarios = action.payload;
    },
    setSettingsScenarios: (state, action: PayloadAction<Scenario[]>) => {
      state.settingsScenarios = action.payload;
    },
    setScenarioDetails: (state, action: PayloadAction<ScenarioDetails>) => {
      state.scenarioDetails = action.payload;
    },
    setScenarioSettings: (state, action: PayloadAction<ScenarioSettings>) => {
      state.scenarioSettings = action.payload;
    }
  }
});

const persistConfig: PersistConfig<ScenariosInitialState> = {
  key: 'scenarios',
  storage,
  whitelist: ['scenario']
};

export const { setScenario, setScenarios, setSettingsScenarios, setScenarioDetails, setScenarioSettings } =
  scenariosSlice.actions;

export default persistReducer(persistConfig, scenariosSlice.reducer);
