import { expect, it } from 'vitest';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderRoute, setupRouteTests } from '../../../test/fixtures/routes';
import { mockDemoApi } from '../../../test/fixtures/api';
import apiResponses from '../../../test/fixtures/apiResponses.json';

setupRouteTests();

it('updates comparison weights and reflects the saved settings', async () => {
  const original = apiResponses['/compare-settings/3'].settings;
  const settings = { ...original, weights: { ...original.weights, averageResponseTime: 0.4 } };
  const fetchMock = mockDemoApi({ 'PATCH /compare-settings/3': { settings } });
  const store = renderRoute('/services/3/settings/compare-weights');
  await waitFor(() => expect(store.getState().compareSettings.compareSettings.weights.averageResponseTime).toBe(0.5));
  await waitFor(() => expect(screen.getByRole('spinbutton', { name: 'Average response time (ms)' })).toHaveValue(0.5));
  const field = screen.getByRole('spinbutton', { name: 'Average response time (ms)' });
  fireEvent.change(field, { target: { value: '0.4' } });
  fireEvent.click(screen.getByTestId('CheckIcon').closest('button')!);
  await waitFor(() => expect(store.getState().compareSettings.compareSettings.weights.averageResponseTime).toBe(0.4));
  const patch = fetchMock.mock.calls.find(([url, options]) =>
    new URL(url).pathname.endsWith('/compare-settings/3') && options?.method === 'PATCH');
  expect(JSON.parse(patch![1]!.body as string)).toEqual({ weights: settings.weights });
});

it('updates the comparison highlight threshold', async () => {
  const original = apiResponses['/compare-settings/3'].settings;
  const settings = { ...original, highlightThreshold: { ...original.highlightThreshold, compareWithAverage: -35 } };
  const fetchMock = mockDemoApi({ 'PATCH /compare-settings/3': { settings } });
  const store = renderRoute('/services/3/settings/compare-highlight-threshold');
  await waitFor(() => expect(screen.getByRole('spinbutton', { name: 'Compare with average' })).toHaveValue(-50),
    { timeout: 12000 });
  const field = screen.getByRole('spinbutton', { name: 'Compare with average' });
  fireEvent.change(field, { target: { value: '-35' } });
  fireEvent.click(screen.getByTestId('CheckIcon').closest('button')!);
  await waitFor(() => expect(store.getState().compareSettings.compareSettings.highlightThreshold.compareWithAverage)
    .toBe(-35));
  const patch = fetchMock.mock.calls.find(([url, options]) =>
    new URL(url).pathname.endsWith('/compare-settings/3') && options?.method === 'PATCH');
  expect(JSON.parse(patch![1]!.body as string)).toEqual({ highlightThreshold: settings.highlightThreshold });
});
