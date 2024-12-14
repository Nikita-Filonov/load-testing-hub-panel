export interface MethodResult {
  method: string;
  maxResponseTime: number;
  minResponseTime: number;
  numberOfRequests: number;
  numberOfFailures: number;
  totalResponseTime: number;
  requestsPerSecond: number;
  failuresPerSecond: number;
  averageResponseTime: number;
  averageContentLength: number;
}

export interface GetMethodResultsQuery extends Record<string, number> {
  loadTestResultId: number;
}

export interface GetMethodResultsResponse {
  results: MethodResult[];
}
