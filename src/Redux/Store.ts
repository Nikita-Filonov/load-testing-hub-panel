import { configureStore } from '@reduxjs/toolkit';
import coreReducer from './Core/CoreSlice';
import ratioResultsReducer from './Results/RatioResults/ResultsSlice';
import { persistStore } from 'redux-persist';
import analyticsReducer from './Analytics/AnalyticsSlice';
import servicesReducer from './Services/Services/ServicesSlice';
import methodReducer from './Results/Methods/MethodsSlice';
import methodResultsReducer from './Results/MethodResults/MethodResultsSlice';
import loadTestResultsReducer from './Results/LoadTestResults/LoadTestResultsSlice';
import historyResultsReducer from './Results/HistoryResults/HistoryResultsSlice';
import scenariosReducer from './Services/Scenarios/ScenariosSlice';
import exceptionResultsReducer from './Results/ExceptionResults/ExceptionResultsSlice';
import comparesReducer from './Compares/Compares/ComparesSlice';
import compareSettingsReducer from './Compares/CompareSettings/CompareSettingsSlice';

export const store = configureStore({
  reducer: {
    core: coreReducer,
    methods: methodReducer,
    services: servicesReducer,
    compares: comparesReducer,
    scenarios: scenariosReducer,
    analytics: analyticsReducer,
    ratioResults: ratioResultsReducer,
    methodResults: methodResultsReducer,
    historyResults: historyResultsReducer,
    compareSettings: compareSettingsReducer,
    loadTestResults: loadTestResultsReducer,
    exceptionResults: exceptionResultsReducer
  }
});
export const persistor = persistStore(store);
