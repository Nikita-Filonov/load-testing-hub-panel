import { INITIAL_SCENARIOS } from './InitialState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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

export default slice.reducer;
