export interface NumberOfRequestsAnalytics {
  datetime: string;
  numberOfRequests: number;
  numberOfFailures: number;
}

export interface GetNumberOfRequestsAnalyticsResponse {
  analytics: NumberOfRequestsAnalytics[];
}
