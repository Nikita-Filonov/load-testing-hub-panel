import { expect, it } from 'vitest';
import { screen, waitFor, within } from '@testing-library/react';
import { renderRoute, setupRouteTests } from '../../../test/fixtures/routes';

setupRouteTests();

it('renders optional method analytics charts when all metrics are enabled', async () => {
  const store = renderRoute('/services/3/dashboard', true);
  expect(await screen.findByText('Distribution by method charts', {}, { timeout: 12000 })).toBeInTheDocument();
  await waitFor(() => expect(store.getState().analytics.methodsResponseTimesAnalytics.length).toBeGreaterThan(0));
  const widget = screen.getByText('Distribution by method charts').closest('.MuiPaper-root') as HTMLElement;
  expect(within(widget).getByText('Min response time (ms)')).toBeInTheDocument();
  expect(within(widget).getByText('Failures per second')).toBeInTheDocument();
});
