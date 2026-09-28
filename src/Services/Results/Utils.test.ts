import { afterEach, describe, expect, it } from 'vitest';
import { SettingsManager } from '../Config';
import {
  buildLoadTestResultURL,
  buildResultsURL,
  getDefaultLoadTestResultsFilters,
  getLoadTestResultDates,
  getLoadTestResultDuration,
  getLoadTestResultTitle
} from './Utils';
import { LoadTestResult } from '../../Models/Results/LoadTestResults';
import { ScenarioTag } from '../../Models/Services/Scenarios';

const result = {
  id: 31,
  service: { id: 7, name: 'Checkout', url: '' },
  scenario: { id: 3, name: 'Peak traffic', tags: [ScenarioTag.Latest], version: '1' },
  startedAt: '2026-09-27T10:00:00',
  finishedAt: '2026-09-27T10:01:30',
  duration: 90
} as LoadTestResult;

describe('load test result presentation', () => {
  afterEach(() => SettingsManager.setup(null));

  it('uses service and scenario names in the result title', () => {
    expect(getLoadTestResultTitle(result)).toBe('#31 Load tests for Checkout, Peak traffic scenario');
  });

  it('formats dates and duration using configured formats', () => {
    SettingsManager.setup({ serverUrl: '', apiVersion: '', apiDateFormat: 'YYYY-MM-DD',
      apiTimeFormat: 'HH:mm:ss', durationFormat: 'm[m]s[s]', pickerDateFormat: '', pickerTimeFormat: '' });
    expect(getLoadTestResultDates(result)).toBe('2026-09-27 10:00:00 — 2026-09-27 10:01:30');
    expect(getLoadTestResultDuration(result)).toBe('1m30s');
  });

  it('builds service and detail links using the browser origin', () => {
    expect(buildResultsURL(7)).toBe('http://localhost:3000/services/7/results');
    expect(buildLoadTestResultURL(31, 7)).toBe('http://localhost:3000/services/7/results/31');
  });

  it('starts with empty filters', () => {
    expect(getDefaultLoadTestResultsFilters()).toEqual({
      startedAt: null, finishedAt: null, triggerCIProjectVersion: null
    });
  });
});
