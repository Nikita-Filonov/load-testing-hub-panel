import { INITIAL_SCENARIOS, ScenariosInitialState } from './InitialState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PersistConfig } from 'redux-persist/es/types';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { Scenario, ScenarioDetails } from '../../../Models/Services/Scenarios';
import { ScenarioSettings } from '../../../Models/Services/ScenarioSettings';

type DeleteScenario = {
  scenarioId: number;
};

export const slice = createSlice({
  name: 'scenarios',
  initialState: INITIAL_SCENARIOS,
  reducers: {
    setScenario: (state, action: PayloadAction<Scenario>) => {
      state.scenario = action.payload;
    },
    setScenarios: (state, action: PayloadAction<Scenario[]>) => {
      state.scenarios = action.payload;
    },
    createScenario: (state, action: PayloadAction<Scenario>) => {
      state.scenarios = [...state.scenarios, action.payload];
    },
    updateScenario: (state, action: PayloadAction<Scenario>) => {
      const newScenario = action.payload;
      state.scenarios = state.scenarios.map((scenario: Scenario) =>
        scenario.id === newScenario.id ? newScenario : scenario
      );

      if (state.scenario.id === newScenario.id) state.scenario = newScenario;
    },
    deleteScenario: (state, action: PayloadAction<DeleteScenario>) => {
      const scenarioId = action.payload.scenarioId;
      state.scenarios = state.scenarios.filter((scenario) => scenario.id !== scenarioId);

      if (state.scenario.id === scenarioId) state.scenario = INITIAL_SCENARIOS.scenario;
    },
    setScenarioDetails: (state, action: PayloadAction<ScenarioDetails>) => {
      state.scenarioDetails = action.payload;
    },
    setScenarioSettings: (state, action: PayloadAction<ScenarioSettings>) => {
      state.scenarioSettings = action.payload;
    },
    clearScenariosState: () => INITIAL_SCENARIOS
  }
});

const persistConfig: PersistConfig<ScenariosInitialState> = {
  key: 'scenarios',
  storage,
  whitelist: ['scenario']
};

export const {
  setScenario,
  setScenarios,
  createScenario,
  updateScenario,
  deleteScenario,
  setScenarioDetails,
  setScenarioSettings,
  clearScenariosState
} = slice.actions;

export default persistReducer(persistConfig, slice.reducer);
