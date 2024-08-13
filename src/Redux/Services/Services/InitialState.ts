import { Service } from '../../../Models/Services/Services';

export type ServicesInitialState = {
  service: Service;
  services: Service[];
  settingsServices: Service[];
};

export const INITIAL_SERVICES: ServicesInitialState = {
  service: {
    url: '',
    name: '',
    isInternal: false
  },
  services: [],
  settingsServices: []
};
