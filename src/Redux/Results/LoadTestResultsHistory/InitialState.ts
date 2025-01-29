import { ResultsHistory } from '../../../Models/Results/ResultsHistory';

export type LoadTestResultsHistoryInitialState = {
  loadTestResultsHistory: ResultsHistory[];
};

export const INITIAL_LOAD_TEST_RESULTS_HISTORY: LoadTestResultsHistoryInitialState = {
  loadTestResultsHistory: []
};
