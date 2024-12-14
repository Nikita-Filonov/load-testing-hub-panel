import { HistoryResult } from '../../../Models/Results/HistoryResults';

export type HistoryResultsInitialState = {
  historyResults: HistoryResult[];
};

export const INITIAL_HISTORY_RESULTS: HistoryResultsInitialState = {
  historyResults: []
};
