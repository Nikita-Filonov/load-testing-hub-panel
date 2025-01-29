import {
  CompareResultWithResults,
  CompareResultWithResultsAverageSummary
} from '../../../Models/Compares/CompareResultWithResults';
import { getDefaultLoadTestResultCompare } from '../../../Services/Compares/Utils';

export type CompareResultWithResultsInitialState = {
  compareResultWithResults: CompareResultWithResults[];
  compareResultWithResultsAverageSummary: CompareResultWithResultsAverageSummary;
};

export const INITIAL_COMPARE_RESULT_WITH_RESULTS: CompareResultWithResultsInitialState = {
  compareResultWithResults: [],
  compareResultWithResultsAverageSummary: {
    loadTestResultCompare: getDefaultLoadTestResultCompare(),
    methodResultCompares: []
  }
};
