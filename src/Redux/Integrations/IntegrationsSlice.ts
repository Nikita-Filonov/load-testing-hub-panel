import { INITIAL_INTEGRATIONS } from './InitialState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Integration } from '../../Models/Integrations/Integrations';

type DeleteIntegration = {
  integrationId: number;
};

export const integrationsSlice = createSlice({
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
    clearIntegrationsState: () => INITIAL_INTEGRATIONS
  }
});

export const {
  setIntegration,
  setIntegrations,
  createIntegration,
  updateIntegration,
  deleteIntegration,
  clearIntegrationsState
} = integrationsSlice.actions;

export default integrationsSlice.reducer;
