export interface BuildIntegrationURLRequest {
  serviceId: number;
  integrationId: number;
  loadTestResultId: number;
}

export interface BuildKibanaDiscoverURLResponse {
  discoverUrl: string;
}

export interface BuildGrafanaDashboardURLResponse {
  dashboardUrl: string;
}
