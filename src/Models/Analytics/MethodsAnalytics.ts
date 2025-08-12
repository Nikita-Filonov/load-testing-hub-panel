import { ResponseTimes } from '../Metrics/ResponseTimes';
import { NumberOfRequests } from '../Metrics/NumberOfRequests';
import { RequestsPerSecond } from '../Metrics/RequestsPerSecond';
import { ProtocolType } from '../Results/MethodResults';

export interface MethodsAnalytics {
  method: string;
  protocol: ProtocolType;
}

export interface MethodsResponseTimesAnalytics extends MethodsAnalytics, ResponseTimes {}

export interface MethodsNumberOfRequestsAnalytics extends MethodsAnalytics, NumberOfRequests {}

export interface MethodsRequestsPerSecondAnalytics extends MethodsAnalytics, RequestsPerSecond {}

export interface GetMethodsResponseTimesAnalyticsResponse {
  analytics: MethodsResponseTimesAnalytics[];
}

export interface GetMethodsNumberOfRequestsAnalyticsResponse {
  analytics: MethodsNumberOfRequestsAnalytics[];
}

export interface GetMethodsRequestsPerSecondAnalyticsResponse {
  analytics: MethodsRequestsPerSecondAnalytics[];
}

export interface GetMethodsAnalyticsQuery {
  serviceId: number;
  scenarioId: number | null;
  endDatetime: string;
  startDatetime: string;
}
