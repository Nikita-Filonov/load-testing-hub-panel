import { INITIAL_SERVICES, ServicesInitialState } from './InitialState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Service } from '../../../Models/Services/Services';
import { PersistConfig } from 'redux-persist/es/types';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export const servicesSlice = createSlice({
  name: 'services',
  initialState: INITIAL_SERVICES,
  reducers: {
    setService: (state, action: PayloadAction<Service>) => {
      state.service = action.payload;
    },
    setServices: (state, action: PayloadAction<Service[]>) => {
      state.services = action.payload;
    },
    setSettingsServices: (state, action: PayloadAction<Service[]>) => {
      state.settingsServices = action.payload;
    }
  }
});

const persistConfig: PersistConfig<ServicesInitialState> = {
  key: 'services',
  storage,
  whitelist: ['service']
};

export const { setService, setServices, setSettingsServices } = servicesSlice.actions;

export default persistReducer(persistConfig, servicesSlice.reducer);
