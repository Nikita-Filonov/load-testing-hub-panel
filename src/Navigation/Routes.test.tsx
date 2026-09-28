import { expect, it, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { renderRoute, setupRouteTests } from '../test/fixtures/routes';
import { mockDemoApi } from '../test/fixtures/api';

setupRouteTests();

it.each([
  ['/services/3/dashboard', 'Total distribution', '/results-analytics/percentiles'],
  ['/services/3/scenarios', 'Baseline - stable load', '/scenarios'],
  ['/services/3/methods', 'GET /cart', '/methods'],
  ['/services/3/integrations', 'Demo Grafana', '/integrations'],
  ['/services/3/settings/general', 'General Demo - Checkout API settings', '/services/details/3'],
  ['/services/3/results', 'Baseline - stable load', '/load-test-results'],
  ['/services/3/results/64', 'Load tests for', '/method-results'],
  ['/services/3/results/64/compare-result-with-results', 'There are no results to compare here', '/load-test-results/details/64'],
  ['/services/3/results/64/compare-result-with-averages', 'Comparison with averages', '/compares/compare-result-with-averages'],
  ['/services/3/results/64/compare-result-with-scenario', 'Comparison with scenario', '/compares/compare-result-with-scenario'],
  ['/services/3/methods/details?method=GET%20%2Fcart&protocol=http', 'Method details', '/methods/details'],
  ['/services/3/settings/compare-weights', 'Compare weights for Demo - Checkout API', '/compare-settings/3'],
  ['/services/3/settings/compare-highlight-threshold', 'Compare highlight threshold', '/compare-settings/3']
])('loads %s and its data', async (path, label, endpoint) => {
  const store = renderRoute(path);
  expect(await screen.findAllByText(new RegExp(label), {}, { timeout: 12000 })).not.toHaveLength(0);
  expect(store.getState().services.service.id).toBe(3);
  await waitFor(() => {
    const calls = vi.mocked(fetch).mock.calls.map(([url]) => new URL(url as string).pathname);
    expect(calls).toContain(`/api/v1${endpoint}`);
  });
}, 20000);

it.each([
  ['/services', 'GET /services', { services: [] }, 'There is no services'],
  ['/services/3/scenarios', 'GET /scenarios', { scenarios: [] }, 'There is no scenarios'],
  ['/services/3/integrations', 'GET /integrations', { integrations: [] }, 'There is no integrations'],
  ['/services/3/methods', 'GET /methods', { methods: [] }, 'There is no methods'],
  ['/services/3/results', 'GET /load-test-results', { items: [], total: 0, limit: 20, offset: 0 }, 'There is no results']
])('shows the empty state on %s', async (path, endpoint, response, message) => {
  mockDemoApi({ [endpoint]: response });
  renderRoute(path);
  expect(await screen.findByText(message, {}, { timeout: 12000 })).toBeInTheDocument();
});

it.each(['/services/0/results', '/services/invalid/results'])
  ('redirects an invalid service URL %s to the service list', async (path) => {
    renderRoute(path);
    expect(await screen.findByText('#3 Demo - Checkout API', {}, { timeout: 12000 })).toBeInTheDocument();
  });

it('returns to the service list when the requested service does not exist', async () => {
  mockDemoApi({}, { 'GET /services/3': { status: 404, body: { detail: 'Service not found' } } });
  renderRoute('/services/3/results');
  expect(await screen.findByText('#3 Demo - Checkout API', {}, { timeout: 12000 })).toBeInTheDocument();
});

it.each(['/services/3/methods/details', '/services/3/methods/details?method=GET%20%2Fcart'])
  ('returns to the method list when method parameters are incomplete: %s', async (path) => {
    renderRoute(path);
    expect(await screen.findByText('Aggregated methods', {}, { timeout: 12000 })).toBeInTheDocument();
  });
