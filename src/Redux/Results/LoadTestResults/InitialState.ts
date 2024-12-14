import { LoadTestResult, LoadTestResultDetails } from '../../../Models/Results/LoadTestResults';
import { INITIAL_SCENARIOS } from '../../Services/Scenarios/InitialState';
import { INITIAL_SERVICES } from '../../Services/Services/InitialState';

export type LoadTestResultsInitialState = {
  loadTestResults: LoadTestResult[];
  loadTestResultsTotal: number;
  loadTestResultDetails: LoadTestResultDetails;
};

export const INITIAL_LOAD_TEST_RESULTS: LoadTestResultsInitialState = {
  loadTestResults: [],
  loadTestResultsTotal: 0,
  loadTestResultDetails: {
    id: 0,
    service: INITIAL_SERVICES.service,
    comment: null,
    scenario: INITIAL_SCENARIOS.scenario,
    startedAt: '',
    finishedAt: '',
    totalRequests: 0,
    numberOfUsers: 0,
    triggerCIJobUrl: null,
    triggerCIPipelineUrl: null,
    triggerCIProjectVersion: null,
    loadTestsCIJobUrl: null,
    loadTestsCIPipelineUrl: null,
    totalRequestsPerSecond: 0,
    totalFailures: 0,
    totalFailuresPerSecond: 0,
    averageResponseTime: 0,
    maxResponseTime: 0,
    minResponseTime: 0,
    compare: null
  }
};
