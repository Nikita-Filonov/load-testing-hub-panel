import { Method, MethodDetails, ShortMethod } from '../../../Models/Results/Methods';

export type MethodsInitialState = {
  methods: Method[];
  shortMethods: ShortMethod[];
  methodDetails: MethodDetails;
};

export const INITIAL_METHODS: MethodsInitialState = {
  methods: [],
  shortMethods: [],
  methodDetails: {
    method: '',
    averageResponseTime: 0,
    averageContentLength: 0,
    averageMaxResponseTime: 0,
    averageMinResponseTime: 0,
    averageNumberOfRequests: 0,
    averageNumberOfFailures: 0,
    averageRequestsPerSecond: 0,
    averageFailuresPerSecond: 0
  }
};
