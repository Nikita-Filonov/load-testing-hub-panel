export interface Service {
  url: string;
  name: string;
  isInternal: boolean;
}

export interface GetServicesQuery extends Record<string, boolean> {
  withInternal: boolean;
}

export interface GetServicesResponse {
  services: Service[];
}

export interface GetServiceResponse {
  service: Service;
}
