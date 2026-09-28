import { ReactElement } from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import coreReducer from '../../Redux/Core/Slice';
import servicesReducer from '../../Redux/Services/Services/Slice';
import integrationsReducer from '../../Redux/Integrations/Slice';
import scenariosReducer from '../../Redux/Services/Scenarios/Slice';
import loadTestResultsReducer from '../../Redux/Results/LoadTestResults/Slice';

export const renderWithStore = (element: ReactElement) => {
  const store = configureStore({
    reducer: { core: coreReducer, services: servicesReducer, integrations: integrationsReducer,
      scenarios: scenariosReducer, loadTestResults: loadTestResultsReducer }
  });
  return { ...render(<Provider store={store}>{element}</Provider>), store };
};
