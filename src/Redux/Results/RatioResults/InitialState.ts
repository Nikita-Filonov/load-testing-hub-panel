import { RatioResult } from '../../../Models/Results/RatioResults';

export type RatioResultsInitialState = {
  ratioResultsTotal: RatioResult[];
  ratioResultsPerClass: RatioResult[];
};

export const INITIAL_RATIO_RESULTS: RatioResultsInitialState = {
  ratioResultsTotal: [],
  ratioResultsPerClass: []
};
