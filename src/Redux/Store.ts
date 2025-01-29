import { configureStore } from '@reduxjs/toolkit';
import coreReducer from './Core/Slice';
import ratioResultsReducer from './Results/RatioResults/Slice';
import { persistStore } from 'redux-persist';
import analyticsReducer from './Analytics/Slice';
import servicesReducer from './Services/Services/Slice';
import methodReducer from './Methods/Slice';
import integrationsReducer from './Integrations/Slice';
import methodResultsReducer from './Results/MethodResults/Slice';
import methodResultsHistoryReducer from './Results/MethodResultsHistory/Slice';
import loadTestResultsReducer from './Results/LoadTestResults/Slice';
import loadTestResultsHistoryReducer from './Results/LoadTestResultsHistory/Slice';
import scenariosReducer from './Services/Scenarios/Slice';
import exceptionResultsReducer from './Results/ExceptionResults/Slice';
import compareMethodWithScenarioReducer from './Compares/CompareMethodWithScenario/Slice';
import compareResultWithResultsReducer from './Compares/CompareResultWithResults/Slice';
import compareResultWithScenarioReducer from './Compares/CompareResultWithScenario/Slice';
import compareResultWithAveragesReducer from './Compares/CompareResultWithAverages/Slice';
import compareAveragesWithScenarioReducer from './Compares/CompareAveragesWithScenario/Slice';
import compareMethodResultsHistoryReducer from './Compares/CompareMethodResultsHistory/Slice';
import compareLoadTestResultsHistoryReducer from './Compares/CompareLoadTestResultsHistory/Slice';
import compareSettingsReducer from './Compares/CompareSettings/CompareSettingsSlice';

export const store = configureStore({
  reducer: {
    core: coreReducer,
    methods: methodReducer,
    services: servicesReducer,
    scenarios: scenariosReducer,
    analytics: analyticsReducer,
    integrations: integrationsReducer,
    ratioResults: ratioResultsReducer,
    methodResults: methodResultsReducer,
    compareSettings: compareSettingsReducer,
    loadTestResults: loadTestResultsReducer,
    exceptionResults: exceptionResultsReducer,
    methodResultsHistory: methodResultsHistoryReducer,
    loadTestResultsHistory: loadTestResultsHistoryReducer,
    compareResultWithResults: compareResultWithResultsReducer,
    compareMethodWithScenario: compareMethodWithScenarioReducer,
    compareResultWithScenario: compareResultWithScenarioReducer,
    compareResultWithAverages: compareResultWithAveragesReducer,
    compareAveragesWithScenario: compareAveragesWithScenarioReducer,
    compareMethodResultsHistory: compareMethodResultsHistoryReducer,
    compareLoadTestResultsHistory: compareLoadTestResultsHistoryReducer
  }
});

export const persistor = persistStore(store);
