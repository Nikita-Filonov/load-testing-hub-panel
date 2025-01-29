import { ResponseTimes } from '../Metrics/ResponseTimes';
import { NumberOfUsers } from '../Metrics/NumberOfUsers';
import { NumberOfRequests } from '../Metrics/NumberOfRequests';
import { RequestsPerSecond } from '../Metrics/RequestsPerSecond';
import { Datetime } from '../Datetime';

export interface CompareResultHistory<Metrics> extends Datetime {
  metrics: Metrics;
}

export interface CompareResultsHistory<Metrics> {
  title: string;
  results: CompareResultHistory<Metrics>[];
}

export interface GetCompareResultsHistoryResponse<Metrics> {
  compares: CompareResultsHistory<Metrics>[];
}

export type CompareResultsHistoryResponseTimes = CompareResultsHistory<ResponseTimes>;

export type CompareResultsHistoryNumberOfUsers = CompareResultsHistory<NumberOfUsers>;

export type CompareResultsHistoryNumberOfRequests = CompareResultsHistory<NumberOfRequests>;

export type CompareResultsHistoryRequestsPerSecond = CompareResultsHistory<RequestsPerSecond>;

export type GetCompareResultsHistoryResponseTimesResponse = GetCompareResultsHistoryResponse<ResponseTimes>;

export type GetCompareResultsHistoryNumberOfUsersResponse = GetCompareResultsHistoryResponse<NumberOfUsers>;

export type GetCompareResultsHistoryNumberOfRequestsResponse = GetCompareResultsHistoryResponse<NumberOfRequests>;

export type GetCompareResultsHistoryRequestsPerSecondResponse = GetCompareResultsHistoryResponse<RequestsPerSecond>;
