import { PaginationQuery, PaginationResponse } from '../Pagination';
import { ShortService } from '../Services/Services';
import { Scenario } from '../Services/Scenarios';
import { NumberOfUsers } from '../Metrics/NumberOfUsers';
import { NumberOfRequests } from '../Metrics/NumberOfRequests';
import { RequestsPerSecond } from '../Metrics/RequestsPerSecond';
import { ResponseTimes } from '../Metrics/ResponseTimes';
import { Percentiles } from '../Metrics/Percentiles';
import { ResultCompare } from './ResultCompare';

export interface LoadTestResultSummaryCompare {
  previousId: number | null;
  compareWithAverage: ResultCompare;
  compareWithPrevious: ResultCompare;
}

export interface ShortLoadTestResult {
  id: number;
  service: ShortService;
  scenario: Scenario;
  triggerCIJobUrl: string | null;
  triggerCIPipelineUrl: string | null;
  triggerCIProjectVersion: string | null;
  loadTestsCIJobUrl: string | null;
  loadTestsCIPipelineUrl: string | null;
}

export interface LoadTestResult extends ShortLoadTestResult, NumberOfUsers, NumberOfRequests, RequestsPerSecond {
  comment: string | null;
  duration: number;
  startedAt: string;
  finishedAt: string;

  compare: LoadTestResultSummaryCompare | null;
}

export interface LoadTestResultDetails extends LoadTestResult, Percentiles, ResponseTimes {}

export interface GetLoadTestResultsQuery extends PaginationQuery {
  serviceId: number;
  startedAt: string | null;
  finishedAt: string | null;
  scenarioId: number | null;
  triggerCIProjectVersion: string | null;
}

export type GetLoadTestResultsResponse = PaginationResponse<LoadTestResult>;

export interface GetLoadTestResultDetailsQuery {
  scenarioId: number | null;
}

export interface GetLoadTestResultDetailsResponse {
  details: LoadTestResultDetails;
}

export type UpdateLoadTestResultQuery = GetLoadTestResultDetailsQuery;

export interface UpdateLoadTestResultRequest {
  comment: string | null;
}
