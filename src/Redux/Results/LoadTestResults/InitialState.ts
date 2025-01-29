import { LoadTestResult, LoadTestResultDetails } from '../../../Models/Results/LoadTestResults';
import { INITIAL_SCENARIOS } from '../../Services/Scenarios/InitialState';
import { INITIAL_SERVICES } from '../../Services/Services/InitialState';
import { getDefaultMetrics } from '../../../Services/Metrics/Base';
import { getDefaultNumberOfUsers } from '../../../Services/Metrics/NumberOfUsers';

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
    duration: 0,
    scenario: INITIAL_SCENARIOS.scenario,
    startedAt: '',
    finishedAt: '',
    triggerCIJobUrl: null,
    triggerCIPipelineUrl: null,
    triggerCIProjectVersion: null,
    loadTestsCIJobUrl: null,
    loadTestsCIPipelineUrl: null,
    compare: null,
    ...getDefaultMetrics(),
    ...getDefaultNumberOfUsers()
  }
};
