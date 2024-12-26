import { CreateServiceRequest, Service } from '../../Models/Services/Services';

export const getDefaultCreateServiceRequest = (): CreateServiceRequest => {
  return {
    url: '',
    name: '',
    cluster: '',
    namespace: ''
  };
};

export const getServiceTitle = (service: Service): string => `#${service.id} ${service.name}`;
