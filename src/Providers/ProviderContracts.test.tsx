import { expect, it } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useAverageAnalytics } from './Analytics/AverageAnalyticsProvider';
import { useMethodsAnalytics } from './Analytics/MethodsAnalyticsProvider';
import { useResultsAnalytics } from './Analytics/ResultsAnalyticsProvider';
import { useCompareAveragesWithScenario } from './Compares/CompareAveragesWithScenarioProvider';
import { useCompareLoadTestResultsHistory } from './Compares/CompareLoadTestResultsHistoryProvider';
import { useCompareMethodResultsHistory } from './Compares/CompareMethodResultsHistoryProvider';
import { useCompareMethodWithScenario } from './Compares/CompareMethodWithScenarioProvider';
import { useCompareResultWithAverages } from './Compares/CompareResultWithAveragesProvider';
import { useCompareResultWithResults } from './Compares/CompareResultWithResultsProvider';
import { useCompareResultWithScenario } from './Compares/CompareResultWithScenarioProvider';
import { useCompareSettings } from './Compares/CompareSettingsProvider';
import { useIntegrations } from './Integrations/IntegrationsProvider';
import { useMethods } from './Methods/MethodsProvider';
import { useExceptionResults } from './Results/ExceptionResultsProvider';
import { useLoadTestResultsHistory } from './Results/LoadTestResultsHistoryProvider';
import { useLoadTestResults } from './Results/LoadTestResultsProvider';
import { useMethodResultsHistory } from './Results/MethodResultsHistoryProvider';
import { useMethodResults } from './Results/MethodResultsProvider';
import { useRatioResults } from './Results/RatioResultsProvider';
import { useScenarioSettings } from './Services/ScenarioSettingsProvider';
import { useScenarios } from './Services/ScenariosProvider';
import { useServices } from './Services/ServicesProvider';

const hooks: [string, () => unknown][] = [
  ['average analytics', useAverageAnalytics],
  ['methods analytics', useMethodsAnalytics],
  ['results analytics', useResultsAnalytics],
  ['average scenario comparison', useCompareAveragesWithScenario],
  ['load test history comparison', useCompareLoadTestResultsHistory],
  ['method history comparison', useCompareMethodResultsHistory],
  ['method scenario comparison', useCompareMethodWithScenario],
  ['result averages comparison', useCompareResultWithAverages],
  ['result results comparison', useCompareResultWithResults],
  ['result scenario comparison', useCompareResultWithScenario],
  ['comparison settings', useCompareSettings],
  ['integrations', useIntegrations],
  ['methods', useMethods],
  ['exceptions', useExceptionResults],
  ['load test history', useLoadTestResultsHistory],
  ['load test results', useLoadTestResults],
  ['method history', useMethodResultsHistory],
  ['method results', useMethodResults],
  ['ratios', useRatioResults],
  ['scenario settings', useScenarioSettings],
  ['scenarios', useScenarios],
  ['services', useServices]
];

it.each(hooks)('reports a missing %s provider at the consumer boundary', (_name, useProvider) => {
  expect(() => renderHook(useProvider)).toThrow(/called outside of a .*Provider\?/);
});
