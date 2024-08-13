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
}

export interface MethodResultCompare {
  method: string;
  currentRequestsPerSecond: number;
  averageRequestsPerSecond: number;
  previousRequestsPerSecond: number;
  requestsPerSecondCompareWithAverage: number;
  requestsPerSecondCompareWithPrevious: number;
}

export interface MethodResultScenarioCompare {
  method: string;
  currentRequestsPerSecond: number;
  scenarioRequestsPerSecond: number;
  requestsPerSecondCompare: number;
}

export interface GetMethodResultsQuery extends Record<string, number> {
  loadTestResultId: number;
}

export interface GetMethodResultsResponse {
  results: MethodResult[];
}

export interface GetMethodResultsComparesQuery extends Record<string, string | number | null> {
  service: string;
  scenario: string | null;
  loadTestResultId: number;
}

export interface GetMethodResultsComparesResponse {
  compares: MethodResultCompare[];
}

export interface GetMethodResultsScenarioComparesQuery extends Record<string, string | number> {
  scenario: string;
  loadTestResultId: number;
}

export interface GetMethodResultsScenarioComparesResponse {
  compares: MethodResultScenarioCompare[];
}
