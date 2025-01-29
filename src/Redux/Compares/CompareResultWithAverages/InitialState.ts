import { CompareResultWithAverages } from '../../../Models/Compares/CompareResultWithAverages';
import { getDefaultLoadTestResultCompare } from '../../../Services/Compares/Utils';

export type CompareResultWithAveragesInitialState = {
  compareResultWithAverages: CompareResultWithAverages;
};

export const INITIAL_COMPARE_RESULT_WITH_AVERAGES: CompareResultWithAveragesInitialState = {
  compareResultWithAverages: {
    methodResultCompares: [],
    loadTestResultCompare: getDefaultLoadTestResultCompare()
  }
};
