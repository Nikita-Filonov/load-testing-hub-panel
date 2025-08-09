import { CoreTableSettings, HeaderSettings, TableType } from '../../Models/Core/TableSettings';
import { MetricKey, MetricName } from '../../Models/Metrics/Base';

export const sortHeaderSettings = (a: HeaderSettings, b: HeaderSettings) => a.index - b.index;

export const filterVisibleHeaderSettings = (header: HeaderSettings) => !header.hidden;

export const getDefaultCoreTableSettings = (): CoreTableSettings => ({
  [TableType.ExceptionResultsTable]: {
    rows: [
      { value: 'numberOfExceptions', index: 0, hidden: false },
      { value: 'message', index: 1, hidden: false }
    ],
    headers: [
      { index: 0, value: 'Number of exceptions', hidden: false, orderKey: 'numberOfExceptions' },
      { index: 1, value: 'Message', hidden: false, orderKey: 'message' }
    ]
  },
  [TableType.MethodResultsStatisticsTable]: {
    rows: [
      { index: 0, value: MetricKey.Method, hidden: false },
      { index: 1, value: MetricKey.Protocol, hidden: false },
      { index: 2, value: MetricKey.MaxResponseTime, hidden: false },
      { index: 3, value: MetricKey.MinResponseTime, hidden: false },
      { index: 4, value: MetricKey.MedianResponseTime, hidden: false },
      { index: 5, value: MetricKey.AverageResponseTime, hidden: false },
      { index: 6, value: MetricKey.NumberOfRequests, hidden: false },
      { index: 7, value: MetricKey.NumberOfFailures, hidden: false },
      { index: 8, value: MetricKey.RequestsPerSecond, hidden: false },
      { index: 9, value: MetricKey.FailuresPerSecond, hidden: false },
      { index: 10, value: MetricKey.AverageContentLength, hidden: false }
    ],
    headers: [
      { index: 0, value: MetricName.Method, hidden: false, orderKey: MetricName.Method },
      { index: 1, value: MetricName.Protocol, hidden: false, orderKey: MetricName.Protocol },
      { index: 2, value: MetricName.MaxResponseTime, hidden: false, orderKey: MetricKey.MaxResponseTime },
      { index: 3, value: MetricName.MinResponseTime, hidden: false, orderKey: MetricKey.MinResponseTime },
      { index: 4, value: MetricName.MedianResponseTime, hidden: false, orderKey: MetricKey.MedianResponseTime },
      { index: 5, value: MetricName.AverageResponseTime, hidden: false, orderKey: MetricKey.AverageResponseTime },
      { index: 6, value: MetricName.NumberOfRequests, hidden: false, orderKey: MetricKey.NumberOfRequests },
      { index: 7, value: MetricName.NumberOfFailures, hidden: false, orderKey: MetricKey.NumberOfFailures },
      { index: 8, value: MetricName.RequestsPerSecond, hidden: false, orderKey: MetricKey.RequestsPerSecond },
      { index: 9, value: MetricName.FailuresPerSecond, hidden: false, orderKey: MetricKey.FailuresPerSecond },
      { index: 10, value: MetricName.AverageContentLength, hidden: false, orderKey: MetricKey.AverageContentLength }
    ]
  },
  [TableType.MethodResultsPercentilesTable]: {
    rows: [
      { index: 0, value: MetricKey.Method, hidden: false },
      { index: 1, value: MetricKey.Protocol, hidden: false },
      { index: 2, value: MetricKey.ResponseTimePercentile50, hidden: false },
      { index: 3, value: MetricKey.ResponseTimePercentile60, hidden: false },
      { index: 4, value: MetricKey.ResponseTimePercentile70, hidden: false },
      { index: 5, value: MetricKey.ResponseTimePercentile80, hidden: false },
      { index: 6, value: MetricKey.ResponseTimePercentile90, hidden: false },
      { index: 7, value: MetricKey.ResponseTimePercentile95, hidden: false },
      { index: 8, value: MetricKey.ResponseTimePercentile99, hidden: false },
      { index: 9, value: MetricKey.ResponseTimePercentile100, hidden: false }
    ],
    headers: [
      { index: 0, value: MetricName.Method, hidden: false, orderKey: MetricKey.Method },
      { index: 1, value: MetricName.Protocol, hidden: false, orderKey: MetricKey.Protocol },
      {
        index: 1,
        value: MetricName.ResponseTimePercentile50,
        hidden: false,
        orderKey: MetricKey.ResponseTimePercentile50
      },
      {
        index: 2,
        value: MetricName.ResponseTimePercentile60,
        hidden: false,
        orderKey: MetricKey.ResponseTimePercentile60
      },
      {
        index: 3,
        value: MetricName.ResponseTimePercentile70,
        hidden: false,
        orderKey: MetricKey.ResponseTimePercentile70
      },
      {
        index: 4,
        value: MetricName.ResponseTimePercentile80,
        hidden: false,
        orderKey: MetricKey.ResponseTimePercentile80
      },
      {
        index: 5,
        value: MetricName.ResponseTimePercentile90,
        hidden: false,
        orderKey: MetricKey.ResponseTimePercentile90
      },
      {
        index: 6,
        value: MetricName.ResponseTimePercentile95,
        hidden: false,
        orderKey: MetricKey.ResponseTimePercentile95
      },
      {
        index: 7,
        value: MetricName.ResponseTimePercentile99,
        hidden: false,
        orderKey: MetricKey.ResponseTimePercentile99
      },
      {
        index: 8,
        value: MetricName.ResponseTimePercentile100,
        hidden: false,
        orderKey: MetricKey.ResponseTimePercentile100
      }
    ]
  }
});
