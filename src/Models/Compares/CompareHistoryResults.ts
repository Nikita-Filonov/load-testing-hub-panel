import { HistoryResult } from '../Results/HistoryResults';

export interface CompareHistoryResults {
  title: string;
  results: HistoryResult[];
}

export interface GetCompareHistoryResultsResponse {
  compares: CompareHistoryResults[];
}
