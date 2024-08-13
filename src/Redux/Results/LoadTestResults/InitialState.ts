import {
  LoadTestResult,
  LoadTestResultDetails,
  LoadTestResultScenarioCompare
} from '../../../Models/Results/LoadTestResults';

export type LoadTestResultsInitialState = {
  loadTestResults: LoadTestResult[];
  loadTestResultsTotal: number;
  loadTestResultDetails: LoadTestResultDetails;
  loadTestResultScenarioCompare: LoadTestResultScenarioCompare;
};

export const INITIAL_LOAD_TEST_RESULTS: LoadTestResultsInitialState = {
  loadTestResults: [],
  loadTestResultsTotal: 0,
  loadTestResultDetails: {
    id: 0,
    service: '',
    scenario: '',
    startedAt: '',
    finishedAt: '',
    totalRequests: 0,
    numberOfUsers: 0,
    triggerCIPipelineUrl: null,
    triggerCIProjectTitle: null,
    triggerCIProjectVersion: null,
    loadTestsCIPipelineUrl: null,
    totalRequestsPerSecond: 0,
    totalFailures: 0,
    totalFailuresPerSecond: 0,
    averageResponseTime: 0,
    maxResponseTime: 0,
    minResponseTime: 0,
    compare: null
  },
  loadTestResultScenarioCompare: {
    currentRequestsPerSecond: 0,
    scenarioRequestsPerSecond: 0,
    requestsPerSecondCompare: 0
  }
};
