import { ResultsHistory } from '../../../Models/Results/ResultsHistory';

export type MethodResultsHistoryInitialState = {
  methodResultsHistory: ResultsHistory[];
};

export const INITIAL_METHOD_RESULTS_HISTORY: MethodResultsHistoryInitialState = {
  methodResultsHistory: []
};
