export interface ShortService {
  id: number;
  url: string;
  name: string;
}

export interface Service extends ShortService {
  numberOfScenarios: number;
  numberOfLoadTestResults: number;
}

export interface ServiceDetails extends Service {
  cluster: string;
  namespace: string;
}

export interface GetServicesResponse {
  services: Service[];
}

export interface GetServiceResponse {
  service: Service;
}

export interface CreateServiceRequest {
  url: string;
  name: string;
  cluster: string;
  namespace: string;
}

export type UpdateServiceRequest = CreateServiceRequest;

export interface GetServiceDetailsResponse {
  details: ServiceDetails;
}
