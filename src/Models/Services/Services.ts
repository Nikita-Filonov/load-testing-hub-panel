export enum ServiceType {
  Internal = 'INTERNAL',
  Production = 'PRODUCTION'
}

export interface Service {
  id: number;
  url: string;
  name: string;
  type: ServiceType;
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
  type: ServiceType;
  cluster: string;
  namespace: string;
}

export interface UpdateServiceRequest extends CreateServiceRequest {}

export interface GetServiceDetailsResponse {
  details: ServiceDetails;
}
