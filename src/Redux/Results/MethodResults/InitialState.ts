import { MethodResult, MethodResultDetails, ProtocolType } from '../../../Models/Results/MethodResults';
import { getDefaultMetrics } from '../../../Services/Metrics/Base';
import { getDefaultContentLength } from '../../../Services/Metrics/ContentLength';

export type MethodResultsInitialState = {
  methodResults: MethodResult[];
  methodResultDetails: MethodResultDetails;
};

export const INITIAL_METHOD_RESULTS: MethodResultsInitialState = {
  methodResults: [],
  methodResultDetails: {
    id: 0,
    method: '',
    compare: null,
    protocol: ProtocolType.GRPC,
    ...getDefaultMetrics(),
    ...getDefaultContentLength()
  }
};
