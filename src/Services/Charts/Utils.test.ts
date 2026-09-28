import { describe, expect, it } from 'vitest';
import { SettingsManager } from '../Config';
import {
  getDefaultCoreChartSettings,
  getDefaultCoreChartWidgetSettings,
  getDefaultNumberOfRequestsLineChartSettings,
  getDurationFromDatetimeData,
  mapChartYAxisData,
  msValueFormatter,
  sliceRangeData
} from './Utils';
import { ChartType, ChartWidgetType } from '../../Models/Core/ChartSettings';

describe('chart data helpers', () => {
  it('keeps both range endpoints', () => {
    expect(sliceRangeData({ data: ['first', 'middle', 'last'], range: [1, 2] })).toEqual(['middle', 'last']);
  });

  it('formats the time range using the configured API formats', () => {
    SettingsManager.setup({
      serverUrl: '', apiVersion: '', apiDateFormat: 'YYYY-MM-DD', apiTimeFormat: 'HH:mm:ss',
      durationFormat: 'm[m]s[s]', pickerDateFormat: '', pickerTimeFormat: ''
    });

    const range = getDurationFromDatetimeData([
      { datetime: '2026-09-27T10:00:00' },
      { datetime: '2026-09-27T10:01:30' }
    ]);

    expect(range.startTime).toBe('10:00:00');
    expect(range.endTime).toBe('10:01:30');
    expect(range.duration).toBe('1m30s');
  });

  it('labels nonzero latency and handles an absent value', () => {
    expect(msValueFormatter(25)).toBe('25 ms');
    expect(msValueFormatter(null)).toBe('unknown');
  });

  it('maps only enabled metrics into the chart series', () => {
    const settings = getDefaultNumberOfRequestsLineChartSettings();
    settings.yAxis[1].enabled = false;
    const axes = mapChartYAxisData({
      data: [{ numberOfRequests: 100, numberOfFailures: 2 },
        { numberOfRequests: 80, numberOfFailures: 1 }],
      settings,
      valueFormatter: (value) => String(value)
    });

    expect(axes).toHaveLength(1);
    expect(axes[0]).toMatchObject({ value: 'numberOfRequests', data: [100, 80] });
  });

  it('keeps separate presets for dashboards and comparison histories', () => {
    const charts = getDefaultCoreChartSettings();
    const widgets = getDefaultCoreChartWidgetSettings();
    expect(charts[ChartType.DashboardNumberOfRequestsBarChart].yAxis.map((axis) => axis.value))
      .toEqual(['numberOfRequests', 'numberOfFailures']);
    expect(widgets[ChartWidgetType.CompareLoadTestResultsHistoryCharts].charts
      .filter((chart) => chart.enabled).map((chart) => chart.key))
      .toEqual(['requestsPerSecond', 'averageResponseTime', 'numberOfUsers']);
  });
});
