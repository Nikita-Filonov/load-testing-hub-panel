import {
  CompareResultsHistoryNumberOfRequests,
  CompareResultsHistoryNumberOfUsers,
  CompareResultsHistoryRequestsPerSecond,
  CompareResultsHistoryResponseTimes
} from '../../../Models/Compares/CompareResultsHistory';

export type CompareLoadTestResultsHistoryInitialState = {
  compareLoadTestResultsHistoryResponseTimes: CompareResultsHistoryResponseTimes[];
  compareLoadTestResultsHistoryNumberOfUsers: CompareResultsHistoryNumberOfUsers[];
  compareLoadTestResultsHistoryNumberOfRequests: CompareResultsHistoryNumberOfRequests[];
  compareLoadTestResultsHistoryRequestsPerSecond: CompareResultsHistoryRequestsPerSecond[];
};

export const INITIAL_COMPARE_LOAD_TEST_RESULTS_HISTORY: CompareLoadTestResultsHistoryInitialState = {
  compareLoadTestResultsHistoryResponseTimes: [],
  compareLoadTestResultsHistoryNumberOfUsers: [],
  compareLoadTestResultsHistoryNumberOfRequests: [],
  compareLoadTestResultsHistoryRequestsPerSecond: []
};
