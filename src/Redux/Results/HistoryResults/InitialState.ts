import { HistoryResult, HistoryResultsCompare } from '../../../Models/Results/HistoryResults';

export type HistoryResultsInitialState = {
  historyResults: HistoryResult[];
  historyResultsCompare: HistoryResultsCompare;
};

export const INITIAL_HISTORY_RESULTS: HistoryResultsInitialState = {
  historyResults: [],
  historyResultsCompare: {
    currentResults: [],
    previousResults: [],
    currentTriggerCIProjectVersion: null,
    previousTriggerCIProjectVersion: null
  }
};
