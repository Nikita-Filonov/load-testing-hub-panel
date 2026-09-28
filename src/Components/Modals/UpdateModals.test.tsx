import { expect, it } from 'vitest';
import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import { renderRoute, setupRouteTests } from '../../test/fixtures/routes';
import { mockDemoApi } from '../../test/fixtures/api';

setupRouteTests();

it.each([
  ['/services', '#3 Demo - Checkout API', 'Update service', '/services/3', 'Demo - Checkout API'],
  ['/services/3/scenarios', '#5 Baseline - stable load', 'Update scenario', '/scenarios/5', 'Baseline - stable load'],
  ['/services/3/integrations', 'Demo Grafana', 'Update integration', '/integrations/3', 'Demo Grafana']
])('shows validation errors and preserves the record on %s', async (path, title, dialogTitle, endpoint, name) => {
  mockDemoApi({}, { [`PATCH ${endpoint}`]: {
    status: 422, body: { detail: [{ loc: ['body', 'name'], msg: 'Name already exists' }] }
  } });
  renderRoute(path);
  const item = (await screen.findByText(title, {}, { timeout: 12000 })).closest('li')!;
  fireEvent.click(within(item).getByTestId('MoreVertIcon').closest('button')!);
  fireEvent.click(screen.getByRole('menuitem', { name: 'Edit' }));
  await screen.findByRole('dialog', { name: dialogTitle });
  await waitFor(() => expect(screen.getByRole('textbox', { name: 'Name' })).toHaveValue(name));
  fireEvent.change(screen.getByRole('textbox', { name: 'Name' }), { target: { value: 'Duplicate' } });
  fireEvent.click(screen.getByRole('button', { name: 'Confirm' }));
  expect(await screen.findByText('Name already exists')).toBeInTheDocument();
  expect(screen.getByRole('dialog', { name: dialogTitle })).toBeInTheDocument();
  expect(screen.getByText(title)).toBeInTheDocument();
});
