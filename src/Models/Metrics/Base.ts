import { Percentiles } from './Percentiles';
import { ResponseTimes } from './ResponseTimes';
import { RequestsPerSecond } from './RequestsPerSecond';
import { NumberOfRequests } from './NumberOfRequests';

export enum MetricKey {
  Method = 'method',
  Protocol = 'protocol',
  NumberOfUsers = 'numberOfUsers',
  MinResponseTime = 'minResponseTime',
  MaxResponseTime = 'maxResponseTime',
  NumberOfRequests = 'numberOfRequests',
  NumberOfFailures = 'numberOfFailures',
  RequestsPerSecond = 'requestsPerSecond',
  FailuresPerSecond = 'failuresPerSecond',
  MedianResponseTime = 'medianResponseTime',
  AverageResponseTime = 'averageResponseTime',
  AverageContentLength = 'averageContentLength',
  ResponseTimePercentile50 = 'responseTimePercentile50',
  ResponseTimePercentile60 = 'responseTimePercentile60',
  ResponseTimePercentile70 = 'responseTimePercentile70',
  ResponseTimePercentile80 = 'responseTimePercentile80',
  ResponseTimePercentile90 = 'responseTimePercentile90',
  ResponseTimePercentile95 = 'responseTimePercentile95',
  ResponseTimePercentile99 = 'responseTimePercentile99',
  ResponseTimePercentile100 = 'responseTimePercentile100'
}

export enum MetricName {
  Method = 'Method',
  Protocol = 'Protocol',
  NumberOfUsers = 'Number of users',
  MinResponseTime = 'Min response time (ms)',
  MaxResponseTime = 'Max response time (ms)',
  NumberOfRequests = 'Number of requests',
  NumberOfFailures = 'Number of failures',
  RequestsPerSecond = 'Requests per second',
  FailuresPerSecond = 'Failures per second',
  MedianResponseTime = 'Median response time (ms)',
  AverageResponseTime = 'Average response time (ms)',
  AverageContentLength = 'Average content length (bytes)',
  ResponseTimePercentile50 = '50%-ile (ms)',
  ResponseTimePercentile60 = '60%-ile (ms)',
  ResponseTimePercentile70 = '70%-ile (ms)',
  ResponseTimePercentile80 = '80%-ile (ms)',
  ResponseTimePercentile90 = '90%-ile (ms)',
  ResponseTimePercentile95 = '95%-ile (ms)',
  ResponseTimePercentile99 = '99%-ile (ms)',
  ResponseTimePercentile100 = '100%-ile (ms)'
}

export enum MetricGroup {
  Percentiles = 'Percentiles (ms)',
  ContentLength = 'Content length',
  NumberOfUsers = 'Number of users',
  ResponseTimes = 'Response times (ms)',
  NumberOfRequests = 'Number of requests',
  RequestsPerSecond = 'Requests per second'
}

export interface Metrics extends Percentiles, ResponseTimes, NumberOfRequests, RequestsPerSecond {}
