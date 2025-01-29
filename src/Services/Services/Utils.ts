import { CreateServiceRequest, Service, ServiceDetails, ShortService } from '../../Models/Services/Services';

export const getDefaultCreateServiceRequest = (): CreateServiceRequest => {
  return {
    url: '',
    name: '',
    cluster: '',
    namespace: ''
  };
};

export const getDefaultShortService = (): ShortService => ({ id: 0, url: '', name: '' });

export const getDefaultService = (): Service => ({
  ...getDefaultShortService(),
  numberOfScenarios: 0,
  numberOfLoadTestResults: 0
});

export const getDefaultServiceDetails = (): ServiceDetails => ({
  ...getDefaultService(),
  cluster: '',
  namespace: ''
});

export const getServiceTitle = (service: Service): string => `#${service.id} ${service.name}`;
