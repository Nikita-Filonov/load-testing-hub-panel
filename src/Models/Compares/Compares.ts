import { CompareExplanationSummary } from './CompareExplanation';

export interface CompareMetric {
  actual: number;
  expected: number;
  compare: number;
}

export interface BaseCompare {
  compare: number;
  highlight: boolean;
  explanation: CompareExplanationSummary;
  minResponseTime: CompareMetric;
  maxResponseTime: CompareMetric;
  numberOfRequests: CompareMetric;
  numberOfFailures: CompareMetric;
  requestsPerSecond: CompareMetric;
  failuresPerSecond: CompareMetric;
  medianResponseTime: CompareMetric;
  averageResponseTime: CompareMetric;
  responseTimePercentile50: CompareMetric;
  responseTimePercentile60: CompareMetric;
  responseTimePercentile70: CompareMetric;
  responseTimePercentile80: CompareMetric;
  responseTimePercentile90: CompareMetric;
  responseTimePercentile95: CompareMetric;
  responseTimePercentile99: CompareMetric;
  responseTimePercentile100: CompareMetric;
}

export interface MethodResultCompare extends BaseCompare {
  method: string;
  averageContentLength: CompareMetric;
}

export interface LoadTestResultCompare extends BaseCompare {
  numberOfUsers: CompareMetric;
}
