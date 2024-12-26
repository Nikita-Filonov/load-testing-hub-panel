import { Service, ServiceDetails } from '../../../Models/Services/Services';

export type ServicesInitialState = {
  service: Service;
  services: Service[];
  serviceDetails: ServiceDetails;
};

const DEFAULT_SERVICE: Service = {
  id: 0,
  url: '',
  name: ''
};

export const INITIAL_SERVICES: ServicesInitialState = {
  service: DEFAULT_SERVICE,
  services: [],
  serviceDetails: {
    ...DEFAULT_SERVICE,
    cluster: '',
    namespace: ''
  }
};
