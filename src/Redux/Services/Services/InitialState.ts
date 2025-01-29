import { Service, ServiceDetails } from '../../../Models/Services/Services';
import { getDefaultService, getDefaultServiceDetails } from '../../../Services/Services/Utils';

export type ServicesInitialState = {
  service: Service;
  services: Service[];
  serviceDetails: ServiceDetails;
};

export const INITIAL_SERVICES: ServicesInitialState = {
  service: getDefaultService(),
  services: [],
  serviceDetails: getDefaultServiceDetails()
};
