import { INITIAL_INTEGRATIONS } from './InitialState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Integration, ShortIntegration } from '../../Models/Integrations/Integrations';

type DeleteIntegration = {
  integrationId: number;
};

export const slice = createSlice({
  name: 'integrations',
  initialState: INITIAL_INTEGRATIONS,
  reducers: {
    setIntegration: (state, action: PayloadAction<Integration>) => {
      state.integration = action.payload;
    },
    setIntegrations: (state, action: PayloadAction<Integration[]>) => {
      state.integrations = action.payload;
    },
    createIntegration: (state, action: PayloadAction<Integration>) => {
      state.integrations = [...state.integrations, action.payload];
    },
    updateIntegration: (state, action: PayloadAction<Integration>) => {
      const newIntegration = action.payload;
      state.integrations = state.integrations.map((integration) =>
        integration.id === newIntegration.id ? newIntegration : integration
      );
    },
    deleteIntegration: (state, action: PayloadAction<DeleteIntegration>) => {
      state.integrations = state.integrations.filter((integration) => integration.id !== action.payload.integrationId);
    },
    setShortIntegrations: (state, action: PayloadAction<ShortIntegration[]>) => {
      state.shortIntegrations = action.payload;
    },
    clearIntegrationsState: () => INITIAL_INTEGRATIONS
  }
});

export const {
  setIntegration,
  setIntegrations,
  createIntegration,
  updateIntegration,
  deleteIntegration,
  setShortIntegrations,
  clearIntegrationsState
} = slice.actions;

export default slice.reducer;
