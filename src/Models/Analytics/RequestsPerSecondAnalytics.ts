export interface RequestsPerSecondAnalytics {
  datetime: string;
  requestsPerSecond: number;
  failuresPerSecond: number;
}

export interface GetRequestsPerSecondAnalyticsResponse {
  analytics: RequestsPerSecondAnalytics[];
}
