import {
  CompareResultsHistoryNumberOfRequests,
  CompareResultsHistoryNumberOfUsers,
  CompareResultsHistoryRequestsPerSecond,
  CompareResultsHistoryResponseTimes
} from '../../../Models/Compares/CompareResultsHistory';

export type CompareMethodResultsHistoryInitialState = {
  compareMethodResultsHistoryResponseTimes: CompareResultsHistoryResponseTimes[];
  compareMethodResultsHistoryNumberOfUsers: CompareResultsHistoryNumberOfUsers[];
  compareMethodResultsHistoryNumberOfRequests: CompareResultsHistoryNumberOfRequests[];
  compareMethodResultsHistoryRequestsPerSecond: CompareResultsHistoryRequestsPerSecond[];
};

export const INITIAL_COMPARE_METHOD_RESULTS_HISTORY: CompareMethodResultsHistoryInitialState = {
  compareMethodResultsHistoryResponseTimes: [],
  compareMethodResultsHistoryNumberOfUsers: [],
  compareMethodResultsHistoryNumberOfRequests: [],
  compareMethodResultsHistoryRequestsPerSecond: []
};
