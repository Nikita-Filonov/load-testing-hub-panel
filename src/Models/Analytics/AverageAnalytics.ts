export interface AverageAnalytics {
  totalRequests: number;
  totalFailures: number;
  numberOfUsers: number;
  maxResponseTime: number;
  minResponseTime: number;
  averageResponseTime: number;
  totalRequestsPerSecond: number;
  totalFailuresPerSecond: number;
}

export interface GetAverageAnalyticsResponse {
  analytics: AverageAnalytics;
}
