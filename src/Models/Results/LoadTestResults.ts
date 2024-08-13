import { PaginationQuery, PaginationResponse } from '../Pagination';

export interface LoadTestResultCompare {
  previousId: number | null;
  currentTotalRequestsPerSecond: number;
  averageTotalRequestsPerSecond: number;
  previousTotalRequestsPerSecond: number;
  totalRequestsPerSecondCompareWithAverage: number;
  totalRequestsPerSecondCompareWithPrevious: number;
}

export interface LoadTestResultScenarioCompare {
  currentRequestsPerSecond: number;
  scenarioRequestsPerSecond: number;
  requestsPerSecondCompare: number;
}

export interface LoadTestResult {
  id: number;
  service: string;
  startedAt: string;
  finishedAt: string;
  totalRequests: number;
  totalFailures: number;
  numberOfUsers: number;
  triggerCIPipelineUrl: string | null;
  triggerCIProjectTitle: string | null;
  triggerCIProjectVersion: string | null;
  loadTestsCIPipelineUrl: string | null;
  totalRequestsPerSecond: number;
  compare: LoadTestResultCompare | null;
}

export interface LoadTestResultDetails extends LoadTestResult {
  scenario: string;
  totalFailuresPerSecond: number;
  averageResponseTime: number;
  maxResponseTime: number;
  minResponseTime: number;
}

export interface GetLoadTestResultsQuery extends PaginationQuery {
  service: string;
  scenario: string | null;
  startedAt: string | null;
  finishedAt: string | null;
  triggerCIProjectVersion: string | null;
}

export interface GetLoadTestResultDetailsQuery extends Record<string, string | number | null> {
  scenario: string | null;
  loadTestResultId: number;
}

export interface GetLoadTestResultsResponse extends PaginationResponse<LoadTestResult> {}

export interface GetLoadTestResultDetailsResponse {
  details: LoadTestResultDetails;
}

export interface GetLoadTestResultScenarioCompareQuery extends Record<string, number> {
  loadTestResultId: number;
}

export interface GetLoadTestResultScenarioCompareResponse {
  compare: LoadTestResultScenarioCompare;
}
