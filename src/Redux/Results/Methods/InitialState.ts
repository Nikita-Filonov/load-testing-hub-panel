import { Method, MethodDetails, MethodScenarioCompare, ShortMethod } from '../../../Models/Results/Methods';

export type MethodsInitialState = {
  methods: Method[];
  shortMethods: ShortMethod[];
  methodDetails: MethodDetails;
  methodScenarioCompare: MethodScenarioCompare;
};

export const INITIAL_METHODS: MethodsInitialState = {
  methods: [],
  shortMethods: [],
  methodDetails: {
    method: '',
    service: '',
    averageResponseTime: 0,
    averageNumberOfRequests: 0,
    averageRequestsPerSecond: 0,
    averageMaxResponseTime: 0,
    averageMinResponseTime: 0,
    averageNumberOfFailures: 0,
    averageFailuresPerSecond: 0
  },
  methodScenarioCompare: {
    scenarioRequestsPerSecond: 0,
    averageRequestsPerSecond: 0,
    averageRequestsPerSecondCompare: 0
  }
};
