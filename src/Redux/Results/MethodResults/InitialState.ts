import { MethodResult, MethodResultCompare, MethodResultScenarioCompare } from '../../../Models/Results/MethodResults';

export type MethodResultsInitialState = {
  methodResults: MethodResult[];
  methodResultsCompares: MethodResultCompare[];
  methodResultScenarioCompares: MethodResultScenarioCompare[];
};

export const INITIAL_METHOD_RESULTS: MethodResultsInitialState = {
  methodResults: [],
  methodResultsCompares: [],
  methodResultScenarioCompares: []
};
