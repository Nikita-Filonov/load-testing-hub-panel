import { Method, MethodDetails, ShortMethod } from '../../Models/Methods/Methods';
import { getDefaultMetrics } from '../../Services/Metrics/Base';
import { getDefaultContentLength } from '../../Services/Metrics/ContentLength';
import { PercentilesAnalytics } from '../../Models/Analytics/PercentilesAnalytics';
import { ResponseTimesAnalytics } from '../../Models/Analytics/ResponseTimesAnalytics';
import { NumberOfRequestsAnalytics } from '../../Models/Analytics/NumberOfRequestsAnalytics';
import { RequestsPerSecondAnalytics } from '../../Models/Analytics/RequestsPerSecondAnalytics';

export type MethodsInitialState = {
  methods: Method[];
  shortMethods: ShortMethod[];
  methodDetails: MethodDetails;
  methodDetailsPercentilesAnalytics: PercentilesAnalytics[];
  methodDetailsResponseTimesAnalytics: ResponseTimesAnalytics[];
  methodDetailsNumberOfRequestsAnalytics: NumberOfRequestsAnalytics[];
  methodDetailsRequestsPerSecondAnalytics: RequestsPerSecondAnalytics[];
};

export const INITIAL_METHODS: MethodsInitialState = {
  methods: [],
  shortMethods: [],
  methodDetails: {
    method: '',
    ...getDefaultMetrics(),
    ...getDefaultContentLength()
  },
  methodDetailsPercentilesAnalytics: [],
  methodDetailsResponseTimesAnalytics: [],
  methodDetailsNumberOfRequestsAnalytics: [],
  methodDetailsRequestsPerSecondAnalytics: []
};
