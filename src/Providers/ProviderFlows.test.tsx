import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { ComponentType, PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { createAppStore } from '../Redux/Store';
import { SettingsManager } from '../Services/Config';
import { mockDemoApi } from '../test/fixtures/api';
import apiResponses from '../test/fixtures/apiResponses.json';
import { ServicesProvider, useServices } from './Services/ServicesProvider';
import { ScenariosProvider, useScenarios } from './Services/ScenariosProvider';
import { ScenarioSettingsProvider, useScenarioSettings } from './Services/ScenarioSettingsProvider';
import { IntegrationsProvider, useIntegrations } from './Integrations/IntegrationsProvider';
import { getDefaultCreateServiceRequest } from '../Services/Services/Utils';
import { getDefaultCreateScenarioRequest } from '../Services/Scenarios/Utils';
import { getDefaultCreateIntegrationRequest } from '../Services/Integrations/Utils';
import { LoadTestResultsProvider, useLoadTestResults } from './Results/LoadTestResultsProvider';
import { MethodResultsProvider, useMethodResults } from './Results/MethodResultsProvider';
import { ExceptionResultsProvider, useExceptionResults } from './Results/ExceptionResultsProvider';
import { RatioResultsProvider, useRatioResults } from './Results/RatioResultsProvider';
import { LoadTestResultsHistoryProvider, useLoadTestResultsHistory } from './Results/LoadTestResultsHistoryProvider';
import { MethodResultsHistoryProvider, useMethodResultsHistory } from './Results/MethodResultsHistoryProvider';

const withStore = (store: ReturnType<typeof createAppStore>, Component: ComponentType<PropsWithChildren>) =>
  ({ children }: PropsWithChildren) => (
    <Provider store={store}>
      <Component>{children}</Component>
    </Provider>
  );

beforeEach(() => {
  SettingsManager.setup({
    serverUrl: 'https://api.example.com', apiVersion: '/api/v1',
    apiDateFormat: 'YYYY-MM-DD', apiTimeFormat: 'HH:mm:ss', durationFormat: 'm[m]s[s]',
    pickerDateFormat: 'dd.MM.yyyy', pickerTimeFormat: 'HH:mm'
  });
});

afterEach(() => {
  vi.unstubAllGlobals();
  SettingsManager.setup(null);
});

describe('data providers', () => {
  it('loads and mutates services while keeping Redux in sync', async () => {
    const details = apiResponses['/services/details/3'].details;
    const created = { ...details, id: 50, name: 'New service' };
    const renamed = { ...created, name: 'Renamed service' };
    const fetchMock = mockDemoApi({
      'POST /services': { details: created },
      'PATCH /services/50': { details: renamed },
      'DELETE /services/50': {}
    });
    const store = createAppStore(null);
    const { result } = renderHook(useServices, { wrapper: withStore(store, ServicesProvider) });
    await act(async () => {
      await result.current.getServices();
      await result.current.getService(3);
      await result.current.getServiceDetails(3);
    });
    expect(store.getState().services.service.id).toBe(3);
    expect(store.getState().services.serviceDetails.cluster).toBe('local-demo');
    expect(store.getState().services.services.length).toBeGreaterThan(0);

    await act(async () => {
      await result.current.createService({ ...getDefaultCreateServiceRequest(), name: 'New service' });
      await result.current.updateService(50, { ...getDefaultCreateServiceRequest(), name: 'Renamed service' });
    });
    expect(store.getState().services.services.find(({ id }) => id === 50)?.name).toBe('Renamed service');
    await act(async () => { await result.current.deleteService(50); });
    expect(store.getState().services.services.some(({ id }) => id === 50)).toBe(false);
    expect(fetchMock.mock.calls.filter(([url]) => new URL(url).pathname.startsWith('/api/v1/services'))).toHaveLength(6);
  });

  it('loads, edits and deletes scenarios and updates their metric targets', async () => {
    const details = apiResponses['/scenarios/details/5'].details;
    const created = { ...details, id: 50, name: 'New scenario' };
    const renamed = { ...created, name: 'Renamed scenario' };
    const settings = apiResponses['/scenario-settings/5'].settings;
    mockDemoApi({
      'POST /scenarios': { details: created },
      'PATCH /scenarios/50': { details: renamed },
      'DELETE /scenarios/50': {},
      'PATCH /scenario-settings/5': { settings }
    });
    const store = createAppStore(null);
    const scenarios = renderHook(useScenarios, { wrapper: withStore(store, ScenariosProvider) });
    const targets = renderHook(useScenarioSettings, { wrapper: withStore(store, ScenarioSettingsProvider) });
    await act(async () => {
      await scenarios.result.current.getScenarios({ serviceId: 3 });
      await scenarios.result.current.getScenario(5);
      await scenarios.result.current.getScenarioDetails(5);
      await targets.result.current.getScenarioSettings(5);
    });
    expect(store.getState().scenarios.scenario.id).toBe(5);
    expect(store.getState().scenarios.scenarioDetails.name).toBe('Baseline - stable load');
    expect(store.getState().scenarios.scenarioSettings.methodsSettings).toHaveLength(3);

    await act(async () => {
      await scenarios.result.current.createScenario({ ...getDefaultCreateScenarioRequest(), serviceId: 3, name: 'New scenario' });
      await scenarios.result.current.updateScenario(50, { ...getDefaultCreateScenarioRequest(), name: 'Renamed scenario' });
      await targets.result.current.updateScenarioSettings(
        5, settings as unknown as Parameters<typeof targets.result.current.updateScenarioSettings>[1]
      );
    });
    expect(store.getState().scenarios.scenarios.find(({ id }) => id === 50)?.name).toBe('Renamed scenario');
    await act(async () => { await scenarios.result.current.deleteScenario(50); });
    expect(store.getState().scenarios.scenarios.some(({ id }) => id === 50)).toBe(false);
  });

  it('loads integration lists, performs CRUD and builds a preview URL', async () => {
    const existing = apiResponses['/integrations'].integrations[0];
    const created = { ...existing, id: 50, name: 'New Grafana' };
    const renamed = { ...created, name: 'Updated Grafana' };
    const fetchMock = mockDemoApi({
      'POST /integrations': { integration: created },
      'PATCH /integrations/50': { integration: renamed },
      'DELETE /integrations/50': {},
      'POST /integrations/build-integration-url': { integrationUrl: 'https://grafana.example.test/d/dashboard' }
    });
    const store = createAppStore(null);
    const { result } = renderHook(useIntegrations, { wrapper: withStore(store, IntegrationsProvider) });
    await act(async () => {
      await result.current.getIntegrations({ serviceId: 3 });
      await result.current.getShortIntegrations({ serviceId: 3 });
      await result.current.getIntegration(existing.id);
    });
    expect(store.getState().integrations.integrations).toHaveLength(3);
    expect(store.getState().integrations.shortIntegrations).toHaveLength(3);
    expect(store.getState().integrations.integration.id).toBe(existing.id);
    await act(async () => {
      await result.current.createIntegration({ ...getDefaultCreateIntegrationRequest(), serviceId: 3, name: 'New Grafana' });
      await result.current.updateIntegration(50, { ...getDefaultCreateIntegrationRequest(), name: 'Updated Grafana' });
    });
    expect(store.getState().integrations.integrations.find(({ id }) => id === 50)?.name).toBe('Updated Grafana');
    await act(async () => {
      const response = await result.current.buildIntegrationURL({ integrationId: existing.id,
        systemType: existing.systemType as never, loadTestResultId: 64 });
      expect(response.response?.integrationUrl).toBe('https://grafana.example.test/d/dashboard');
      await result.current.deleteIntegration(50);
    });
    expect(store.getState().integrations.integrations.some(({ id }) => id === 50)).toBe(false);
    expect(fetchMock.mock.calls.some(([url]) => new URL(url).pathname.endsWith('build-integration-url'))).toBe(true);
  });

  it('loads, updates and deletes test results, preserving the selected result details', async () => {
    const original = apiResponses['/load-test-results/details/64'].details;
    const updated = { ...original, comment: 'Investigated during regression review' };
    const fetchMock = mockDemoApi({
      'PATCH /load-test-results/64': { details: updated },
      'DELETE /load-test-results/64': {}
    });
    const store = createAppStore(null);
    const { result } = renderHook(useLoadTestResults, { wrapper: withStore(store, LoadTestResultsProvider) });
    await act(async () => {
      await result.current.getLoadTestResults({
        serviceId: 3, limit: 20, offset: 0, startedAt: null, finishedAt: null,
        scenarioId: null, triggerCIProjectVersion: null
      });
      await result.current.getLoadTestResultDetails(64, { scenarioId: null });
    });
    expect(store.getState().loadTestResults.loadTestResults).toHaveLength(3);
    expect(store.getState().loadTestResults.loadTestResultDetails.id).toBe(64);
    await act(async () => {
      await result.current.updateLoadTestResult(64, { scenarioId: null }, { comment: updated.comment });
    });
    expect(store.getState().loadTestResults.loadTestResultDetails.comment).toBe(updated.comment);
    expect(store.getState().loadTestResults.loadTestResults.find(({ id }) => id === 64)?.comment).toBe(updated.comment);
    await act(async () => { await result.current.deleteLoadTestResult(64); });
    expect(store.getState().loadTestResults.loadTestResults.some(({ id }) => id === 64)).toBe(false);
    const patch = fetchMock.mock.calls.find(([url, options]) =>
      new URL(url).pathname.endsWith('/load-test-results/64') && options?.method === 'PATCH');
    expect(JSON.parse(patch![1]!.body as string)).toEqual({ comment: updated.comment });
  });

  it('loads method results, exceptions and ratios for a selected test run', async () => {
    mockDemoApi({
      'GET /exception-results/details/137': {
        details: {
          ...apiResponses['/exception-results'].results[0],
          details: 'TimeoutError: downstream deadline exceeded while calling payments'
        }
      }
    });
    const store = createAppStore(null);
    const methods = renderHook(useMethodResults, { wrapper: withStore(store, MethodResultsProvider) });
    const exceptions = renderHook(useExceptionResults, { wrapper: withStore(store, ExceptionResultsProvider) });
    const ratios = renderHook(useRatioResults, { wrapper: withStore(store, RatioResultsProvider) });
    await act(async () => {
      await methods.result.current.getMethodResults({ loadTestResultId: 64 });
      await methods.result.current.getMethodResultDetails(
        apiResponses['/method-results'].results[0].id, { scenarioId: null }
      );
      await exceptions.result.current.getExceptionResults({ loadTestResultId: 64 });
      await exceptions.result.current.getExceptionResultDetails(
        apiResponses['/exception-results'].results[0].id
      );
      await ratios.result.current.getRatioResults(64);
    });
    expect(store.getState().methodResults.methodResults).toHaveLength(3);
    expect(store.getState().methodResults.methodResultDetails.id).toBe(apiResponses['/method-results'].results[0].id);
    expect(store.getState().exceptionResults.exceptionResults.length).toBeGreaterThan(0);
    expect(store.getState().exceptionResults.exceptionResultDetails.message).toBeTruthy();
    expect(store.getState().ratioResults.ratioResultsTotal.length).toBeGreaterThan(0);
  });

  it('loads time series history for a test run and its method result', async () => {
    mockDemoApi();
    const store = createAppStore(null);
    const runHistory = renderHook(useLoadTestResultsHistory, {
      wrapper: withStore(store, LoadTestResultsHistoryProvider)
    });
    const methodHistory = renderHook(useMethodResultsHistory, {
      wrapper: withStore(store, MethodResultsHistoryProvider)
    });
    await act(async () => {
      await runHistory.result.current.getLoadTestResultsHistory({ loadTestResultId: 64 });
      await methodHistory.result.current.getMethodResultsHistory({
        methodResultId: apiResponses['/method-results'].results[0].id
      });
    });
    expect(store.getState().loadTestResultsHistory.loadTestResultsHistory.length).toBeGreaterThan(0);
    expect(store.getState().methodResultsHistory.methodResultsHistory.length).toBeGreaterThan(0);
  });
});
