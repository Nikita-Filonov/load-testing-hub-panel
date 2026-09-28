import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { SettingsManager } from '../Config';
import { mockSuccessfulFetch, readFetchCall } from '../../test/fixtures/http';
import { ServicesHTTPClient } from './Services/ServicesHTTPClient';
import { ScenariosHTTPClient } from './Services/ScenariosHTTPClient';
import { IntegrationsHTTPClient } from './Integrations/IntegrationsHTTPClient';
import { LoadTestResultsHTTPClient } from './Results/LoadTestResultsHTTPClient';
import { CompareResultWithResultsHTTPClient } from './Compares/CompareResultWithResultsHTTPClient';
import { CompareSettingsHTTPClient } from './Compares/CompareSettingsHTTPClient';
import { getDefaultCreateServiceRequest } from '../Services/Utils';
import { getDefaultCreateScenarioRequest } from '../Scenarios/Utils';
import { getDefaultCreateIntegrationRequest } from '../Integrations/Utils';
import { getDefaultCompareSettingsWeights } from '../Compares/Utils';

beforeEach(() => SettingsManager.setup({
  serverUrl: 'https://api.example.com', apiVersion: '/api/v1',
  apiDateFormat: '', apiTimeFormat: '', durationFormat: '', pickerDateFormat: '', pickerTimeFormat: ''
}));

afterEach(() => {
  vi.unstubAllGlobals();
  SettingsManager.setup(null);
});

describe('service and scenario API flows', () => {
  it('sends service create, update and delete to the expected resource', async () => {
    const fetchMock = mockSuccessfulFetch({ details: { id: 7, name: 'Checkout' } });
    const client = new ServicesHTTPClient();
    const create = { ...getDefaultCreateServiceRequest(), name: 'Checkout' };

    const created = await client.createService(create);
    await client.updateService(7, { ...create, name: 'Orders' });
    await client.deleteService(7);

    expect(created.response).toEqual({ details: { id: 7, name: 'Checkout' } });
    expect(readFetchCall(fetchMock, 0)).toEqual({
      url: 'https://api.example.com/api/v1/services', method: 'POST', body: create
    });
    expect(readFetchCall(fetchMock, 1)).toEqual({
      url: 'https://api.example.com/api/v1/services/7', method: 'PATCH', body: { ...create, name: 'Orders' }
    });
    expect(readFetchCall(fetchMock, 2)).toMatchObject({
      url: 'https://api.example.com/api/v1/services/7', method: 'DELETE'
    });
  });

  it('filters scenarios by service and sends a new scenario to the same API', async () => {
    const fetchMock = mockSuccessfulFetch({ scenarios: [] });
    const client = new ScenariosHTTPClient();
    const create = { ...getDefaultCreateScenarioRequest(), serviceId: 7, name: 'Peak traffic' };

    expect((await client.getScenarios({ serviceId: 7 })).response).toEqual({ scenarios: [] });
    await client.createScenario(create);

    expect(readFetchCall(fetchMock, 0).url).toBe('https://api.example.com/api/v1/scenarios?serviceId=7');
    expect(readFetchCall(fetchMock, 1)).toEqual({
      url: 'https://api.example.com/api/v1/scenarios', method: 'POST', body: create
    });
  });
});

describe('integration and result API flows', () => {
  it('sends integration CRUD requests and URL preview', async () => {
    const fetchMock = mockSuccessfulFetch({ url: 'https://grafana.example.com/7' });
    const client = new IntegrationsHTTPClient();
    const create = { ...getDefaultCreateIntegrationRequest(), serviceId: 7, name: 'Grafana' };
    await client.getIntegrations({ serviceId: 7 });
    await client.createIntegration(create);
    await client.updateIntegration(12, { ...create, name: 'Monitoring' });
    await client.deleteIntegration(12);

    expect(readFetchCall(fetchMock, 0).url).toBe('https://api.example.com/api/v1/integrations?serviceId=7');
    expect(readFetchCall(fetchMock, 1)).toMatchObject({ method: 'POST', body: create });
    expect(readFetchCall(fetchMock, 2)).toMatchObject({
      url: 'https://api.example.com/api/v1/integrations/12', method: 'PATCH',
      body: expect.objectContaining({ name: 'Monitoring' })
    });
    expect(readFetchCall(fetchMock, 3)).toMatchObject({
      url: 'https://api.example.com/api/v1/integrations/12', method: 'DELETE'
    });
  });

  it('preserves result paging and filters, and updates comments with scenario context', async () => {
    const fetchMock = mockSuccessfulFetch({ results: [] });
    const client = new LoadTestResultsHTTPClient();
    const query = { serviceId: 7, scenarioId: 3, startedAt: null, finishedAt: null,
      triggerCIProjectVersion: null, offset: 20, limit: 20 };
    await client.getLoadTestResults(query);
    await client.updateLoadTestResult(31, { scenarioId: 3 }, { comment: 'Retest' });

    const listUrl = new URL(readFetchCall(fetchMock, 0).url);
    expect(listUrl.pathname).toBe('/api/v1/load-test-results');
    expect(Object.fromEntries(listUrl.searchParams)).toMatchObject({
      serviceId: '7', scenarioId: '3', offset: '20', limit: '20'
    });
    expect(listUrl.searchParams.has('startedAt')).toBe(false);
    expect(readFetchCall(fetchMock, 1)).toEqual({
      url: 'https://api.example.com/api/v1/load-test-results/31?scenarioId=3',
      method: 'PATCH', body: { comment: 'Retest' }
    });
  });
});

describe('comparison API flows', () => {
  it('passes comparison identifiers and updates service comparison weights', async () => {
    const fetchMock = mockSuccessfulFetch({});
    const query = { loadTestResultId: 31, compareWithLoadTestResults: [30, 29] };
    await new CompareResultWithResultsHTTPClient().getCompareResultWithResults(query);
    await new CompareSettingsHTTPClient().updateCompareSettings(7, {
      weights: getDefaultCompareSettingsWeights()
    });

    const compareUrl = new URL(readFetchCall(fetchMock, 0).url);
    expect(compareUrl.pathname).toBe('/api/v1/compares/compare-result-with-results');
    expect(compareUrl.searchParams.get('loadTestResultId')).toBe('31');
    expect(compareUrl.searchParams.getAll('compareWithLoadTestResults')).toEqual(['30', '29']);
    expect(readFetchCall(fetchMock, 1)).toMatchObject({
      url: 'https://api.example.com/api/v1/compare-settings/7', method: 'PATCH',
      body: { weights: expect.objectContaining({ numberOfRequests: 0 }) }
    });
  });
});
