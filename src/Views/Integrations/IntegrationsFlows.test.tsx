import { expect, it } from 'vitest';
import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import { renderRoute, setupRouteTests } from '../../test/fixtures/routes';
import { mockDemoApi } from '../../test/fixtures/api';
import apiResponses from '../../test/fixtures/apiResponses.json';

setupRouteTests();

it('opens an integration, edits its connection settings and removes it', async () => {
  const integration = { ...apiResponses['/integrations/3'].integration, name: 'Grafana staging' };
  const fetchMock = mockDemoApi({
    'PATCH /integrations/3': { integration },
    'DELETE /integrations/3': {}
  });
  const store = renderRoute('/services/3/integrations');
  fireEvent.click(await screen.findByText('Demo Grafana'));
  expect(await screen.findByRole('dialog', { name: 'Integration details' })).toBeInTheDocument();
  fireEvent.click(within(screen.getByRole('dialog', { name: 'Integration details' })).getByRole('button', { name: 'Cancel' }));

  fireEvent.click(within(screen.getByText('Demo Grafana').closest('li')!).getByTestId('MoreVertIcon').closest('button')!);
  fireEvent.click(screen.getByRole('menuitem', { name: 'Edit' }));
  const edit = await screen.findByRole('dialog', { name: 'Update integration' });
  await waitFor(() => expect(within(edit).getByRole('textbox', { name: 'Name' })).toHaveValue('Demo Grafana'));
  fireEvent.change(within(edit).getByRole('textbox', { name: 'Name' }), { target: { value: 'Grafana staging' } });
  fireEvent.click(within(edit).getByRole('button', { name: 'Confirm' }));
  expect(await screen.findByText('Grafana staging')).toBeInTheDocument();
  expect(fetchMock.mock.calls.some(([url, options]) =>
    new URL(url).pathname.endsWith('/integrations/3') && options?.method === 'PATCH')).toBe(true);

  fireEvent.click(within(screen.getByText('Grafana staging').closest('li')!).getByTestId('MoreVertIcon').closest('button')!);
  fireEvent.click(screen.getByRole('menuitem', { name: 'Delete' }));
  const deleteDialog = await screen.findByRole('dialog', { name: 'Delete integration?' });
  fireEvent.click(within(deleteDialog).getByRole('button', { name: 'Confirm' }));
  await waitFor(() => expect(store.getState().integrations.integrations.some(({ id }) => id === 3)).toBe(false));
});
