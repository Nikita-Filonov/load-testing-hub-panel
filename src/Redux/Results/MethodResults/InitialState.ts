import { MethodResult } from '../../../Models/Results/MethodResults';

export type MethodResultsInitialState = {
  methodResults: MethodResult[];
};

export const INITIAL_METHOD_RESULTS: MethodResultsInitialState = {
  methodResults: []
};
