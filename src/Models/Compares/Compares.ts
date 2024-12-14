export interface CompareMetric {
  actual: number;
  expected: number;
  compare: number;
}

export interface BaseCompare {
  compare: number;
  responseTime: CompareMetric;
  minResponseTime: CompareMetric;
  maxResponseTime: CompareMetric;
  numberOfRequests: CompareMetric;
  numberOfFailures: CompareMetric;
  requestsPerSecond: CompareMetric;
  failuresPerSecond: CompareMetric;
}

export interface MethodResultCompare extends BaseCompare {
  method: string;
  contentLength: CompareMetric;
}

export interface LoadTestResultCompare extends BaseCompare {
  numberOfUsers: CompareMetric;
}
