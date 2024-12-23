import { CreateServiceRequest, GetServicesQuery, Service, ServiceType } from '../../Models/Services/Services';

export const getDefaultCreateServiceRequest = (): CreateServiceRequest => {
  return {
    url: '',
    name: '',
    type: ServiceType.Production,
    cluster: '',
    namespace: ''
  };
};

export const getServiceTitle = (service: Service): string => `#${service.id} ${service.name}`;

export const getDefaultServicesFilters = (): GetServicesQuery => ({ types: [ServiceType.Production] });
