export interface ResponseTimesAnalytics {
  datetime: string;
  maxResponseTime: number;
  minResponseTime: number;
  averageResponseTime: number;
}

export interface GetResponseTimesAnalyticsResponse {
  analytics: ResponseTimesAnalytics[];
}
