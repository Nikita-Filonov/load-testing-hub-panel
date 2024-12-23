import { INITIAL_SERVICES, ServicesInitialState } from './InitialState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Service, ServiceDetails } from '../../../Models/Services/Services';
import { PersistConfig } from 'redux-persist/es/types';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

type DeleteService = {
  serviceId: number;
};

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
    createService: (state, action: PayloadAction<ServiceDetails>) => {
      state.services = [...state.services, action.payload];
    },
    updateService: (state, action: PayloadAction<ServiceDetails>) => {
      const newService = action.payload;
      state.services = state.services.map((service: Service) => (service.id === newService.id ? newService : service));

      if (state.service.id === newService.id) {
        state.service = newService;
        state.serviceDetails = newService;
      }
    },
    deleteService: (state, action: PayloadAction<DeleteService>) => {
      const serviceId = action.payload.serviceId;
      state.services = state.services.filter((service) => service.id !== serviceId);

      if (state.service.id === serviceId) state.service = INITIAL_SERVICES.service;
    },
    setServiceDetails: (state, action: PayloadAction<ServiceDetails>) => {
      state.serviceDetails = action.payload;
    }
  }
});

const persistConfig: PersistConfig<ServicesInitialState> = {
  key: 'services',
  storage,
  whitelist: ['service']
};

export const { setService, setServices, createService, updateService, deleteService, setServiceDetails } =
  servicesSlice.actions;

export default persistReducer(persistConfig, servicesSlice.reducer);
