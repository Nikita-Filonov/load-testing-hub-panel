import { describe, expect, it } from 'vitest';
import {
  filterEnabledCompareTableRowSettings,
  getDefaultCompareSettingsWeights,
  getDefaultLoadTestResultCompare,
  getDefaultMethodResultCompare,
  sortCompareTableRowSettings,
  sumCompareSettingsWeights
} from './Utils';
import {
  getCompareColor,
  getCompareTitle,
  getDefaultCompareWidgetSettings
} from '../Compare/Utils';
import { MetricName } from '../../Models/Metrics/Base';
import { ProtocolType } from '../../Models/Results/MethodResults';
import { LoadTestResultCompare } from '../../Models/Compares/Compares';

describe('comparison presentation', () => {
  it.each([
    [undefined, 'No info', 'warning'],
    [12, '12% better than baseline', 'success'],
    [-8, '-8% worse than baseline', 'error'],
    [0, 'No difference to baseline', 'warning']
  ] as const)('maps comparison %s to its label and color', (percent, title, color) => {
    expect(getCompareTitle({ percent, context: 'baseline' })).toBe(title);
    expect(getCompareColor(percent)).toBe(color);
  });

  it('keeps the result and method metrics separate in default widgets', () => {
    const widgets = getDefaultCompareWidgetSettings();
    expect(widgets.loadTestResultCompareTable.rows.at(-1)).toMatchObject({
      metricName: MetricName.NumberOfUsers, index: 16
    });
    expect(widgets.methodResultCompareTable.rows.at(-1)).toMatchObject({
      metricName: MetricName.AverageContentLength, index: 16
    });
    expect(widgets.methodResultCompareTable.rows).toHaveLength(17);
  });
});

describe('comparison calculations', () => {
  it('sums every configured metric weight, including zero and negative values', () => {
    const weights = getDefaultCompareSettingsWeights();
    expect(sumCompareSettingsWeights()).toBe(0);
    expect(sumCompareSettingsWeights({ ...weights, numberOfUsers: 4, averageResponseTime: -2,
      responseTimePercentile99: 5 })).toBe(7);
  });

  it('provides metric-specific defaults for method and load test comparisons', () => {
    const method = getDefaultMethodResultCompare();
    const result = getDefaultLoadTestResultCompare();
    expect(method).toMatchObject({ method: '', protocol: ProtocolType.GRPC,
      averageContentLength: { actual: 0, expected: 0, compare: 0 } });
    expect(result.numberOfUsers).toEqual({ actual: 0, expected: 0, compare: 0 });
    expect(result.highlight).toBe(false);
  });

  it('orders enabled metric rows by their explicit positions', () => {
    const rows = getDefaultCompareWidgetSettings().loadTestResultCompareTable.rows;
    const configured = [
      { ...rows[2], index: 2, enabled: true },
      { ...rows[0], index: 0, enabled: true },
      { ...rows[1], index: 1, enabled: false }
    ];
    expect(configured
      .filter((row) => filterEnabledCompareTableRowSettings<LoadTestResultCompare>(row))
      .sort((a, b) => sortCompareTableRowSettings<LoadTestResultCompare>(a, b))
      .map(({ metricValue }) => metricValue)).toEqual(['numberOfRequests', 'averageResponseTime']);
  });
});
