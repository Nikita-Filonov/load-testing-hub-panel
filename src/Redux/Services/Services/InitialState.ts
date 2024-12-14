import { Service, ServiceDetails, ServiceType } from '../../../Models/Services/Services';

export type ServicesInitialState = {
  service: Service;
  services: Service[];
  serviceDetails: ServiceDetails;
};

const DEFAULT_SERVICE: Service = {
  id: 0,
  url: '',
  name: '',
  type: ServiceType.Production
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
