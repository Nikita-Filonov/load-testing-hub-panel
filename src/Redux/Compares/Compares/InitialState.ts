import {
  CompareResultWithResults,
  CompareResultWithResultsAverageSummary
} from '../../../Models/Compares/CompareResultWithResults';
import { CompareResultWithAverages } from '../../../Models/Compares/CompareResultWithAverages';
import { CompareResultWithScenario } from '../../../Models/Compares/CompareResultWithScenario';
import { BaseCompare, LoadTestResultCompare, MethodResultCompare } from '../../../Models/Compares/Compares';
import { CompareHistoryResults } from '../../../Models/Compares/CompareHistoryResults';
import { INITIAL_SCENARIOS } from '../../Services/Scenarios/InitialState';

export type ComparesInitialState = {
  compareHistoryResults: CompareHistoryResults[];
  compareResultWithResults: CompareResultWithResults[];
  compareResultWithAverages: CompareResultWithAverages;
  compareResultWithScenario: CompareResultWithScenario;
  compareMethodWithScenario: MethodResultCompare;
  compareAveragesWithScenario: LoadTestResultCompare;
  compareResultWithResultsAverageSummary: CompareResultWithResultsAverageSummary;
};

const DEFAULT_BASE_COMPARE: BaseCompare = {
  compare: 0,
  highlight: false,
  responseTime: { actual: 0, expected: 0, compare: 0 },
  minResponseTime: { actual: 0, expected: 0, compare: 0 },
  maxResponseTime: { actual: 0, expected: 0, compare: 0 },
  numberOfRequests: { actual: 0, expected: 0, compare: 0 },
  numberOfFailures: { actual: 0, expected: 0, compare: 0 },
  requestsPerSecond: { actual: 0, expected: 0, compare: 0 },
  failuresPerSecond: { actual: 0, expected: 0, compare: 0 }
};

const DEFAULT_METHOD_RESULT_COMPARE: MethodResultCompare = {
  ...DEFAULT_BASE_COMPARE,
  method: '',
  contentLength: { actual: 0, expected: 0, compare: 0 }
};

const DEFAULT_LOAD_TEST_RESULT_COMPARE: LoadTestResultCompare = {
  ...DEFAULT_BASE_COMPARE,
  numberOfUsers: { actual: 0, expected: 0, compare: 0 }
};

export const INITIAL_COMPARES: ComparesInitialState = {
  compareHistoryResults: [],
  compareResultWithResults: [],
  compareResultWithAverages: {
    methodResultCompares: [],
    loadTestResultCompare: DEFAULT_LOAD_TEST_RESULT_COMPARE
  },
  compareResultWithScenario: {
    scenario: INITIAL_SCENARIOS.scenario,
    methodResultCompares: [],
    loadTestResultCompare: DEFAULT_LOAD_TEST_RESULT_COMPARE
  },
  compareMethodWithScenario: DEFAULT_METHOD_RESULT_COMPARE,
  compareAveragesWithScenario: DEFAULT_LOAD_TEST_RESULT_COMPARE,
  compareResultWithResultsAverageSummary: {
    loadTestResultCompare: DEFAULT_LOAD_TEST_RESULT_COMPARE,
    methodResultCompares: []
  }
};
