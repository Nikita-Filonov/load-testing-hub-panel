import { PaginationQuery, PaginationResponse } from '../Pagination';
import { Service } from '../Services/Services';
import { Scenario } from '../Services/Scenarios';
import { BaseCompare } from '../Compares/Compares';

export interface LoadTestResultCompare extends Pick<BaseCompare, 'compare' | 'highlight'> {}

export interface LoadTestResultSummaryCompare {
  previousId: number | null;
  compareWithAverage: LoadTestResultCompare;
  compareWithPrevious: LoadTestResultCompare;
}

export interface ShortLoadTestResult {
  id: number;
  service: Service;
  scenario: Scenario;
  triggerCIJobUrl: string | null;
  triggerCIPipelineUrl: string | null;
  triggerCIProjectVersion: string | null;
  loadTestsCIJobUrl: string | null;
  loadTestsCIPipelineUrl: string | null;
}

export interface LoadTestResult extends ShortLoadTestResult {
  comment: string | null;
  duration: number;
  startedAt: string;
  finishedAt: string;
  totalRequests: number;
  totalFailures: number;
  numberOfUsers: number;
  totalRequestsPerSecond: number;

  compare: LoadTestResultSummaryCompare | null;
}

export interface LoadTestResultDetails extends LoadTestResult {
  totalFailuresPerSecond: number;
  averageResponseTime: number;
  maxResponseTime: number;
  minResponseTime: number;
}

export interface GetLoadTestResultsQuery extends PaginationQuery {
  serviceId: number;
  startedAt: string | null;
  finishedAt: string | null;
  scenarioId: number | null;
  triggerCIProjectVersion: string | null;
}

export interface GetLoadTestResultsResponse extends PaginationResponse<LoadTestResult> {}

export interface GetLoadTestResultDetailsQuery {
  scenarioId: number | null;
}

export interface GetLoadTestResultDetailsResponse {
  details: LoadTestResultDetails;
}

export interface UpdateLoadTestResultQuery extends GetLoadTestResultDetailsQuery {}

export interface UpdateLoadTestResultRequest {
  comment: string | null;
}
