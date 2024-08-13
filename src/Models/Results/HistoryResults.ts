export interface HistoryResult {
  datetime: string;
  numberOfUsers: number;
  requestsPerSecond: number;
  failuresPerSecond: number;
  averageResponseTime: number;
  responseTimePercentile95: number;
}

export interface HistoryResultsCompare {
  currentResults: HistoryResult[];
  previousResults: HistoryResult[];
  currentTriggerCIProjectVersion: string | null;
  previousTriggerCIProjectVersion: string | null;
}

export interface GetHistoryResultsQuery extends Record<string, number> {
  loadTestResultId: number;
}

export interface GetHistoryResultsResponse {
  results: HistoryResult[];
}

export interface GetHistoryResultsCompareResponse {
  compare: HistoryResultsCompare;
}
