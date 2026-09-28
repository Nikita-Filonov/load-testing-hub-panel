import { expect, it } from 'vitest';
import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import { renderRoute, setupRouteTests } from '../../test/fixtures/routes';
import { mockDemoApi } from '../../test/fixtures/api';
import apiResponses from '../../test/fixtures/apiResponses.json';

setupRouteTests();

it('shows service details, edits a service and deletes it from the list', async () => {
  const details = { ...apiResponses['/services/details/3'].details, name: 'Checkout renamed' };
  const fetchMock = mockDemoApi({
    'PATCH /services/3': { details },
    'DELETE /services/3': {}
  });
  const store = renderRoute('/services');
  const title = await screen.findByText('#3 Demo - Checkout API');
  fireEvent.click(within(title.closest('li')!).getByTestId('MoreVertIcon').closest('button')!);
  fireEvent.click(screen.getByRole('menuitem', { name: 'View details' }));
  expect(await screen.findByRole('dialog', { name: 'Service details' })).toBeInTheDocument();
  fireEvent.click(within(screen.getByRole('dialog', { name: 'Service details' })).getByRole('button', { name: 'Cancel' }));

  fireEvent.click(within(screen.getByText('#3 Demo - Checkout API').closest('li')!).getByTestId('MoreVertIcon').closest('button')!);
  fireEvent.click(screen.getByRole('menuitem', { name: 'Edit' }));
  const edit = await screen.findByRole('dialog', { name: 'Update service' });
  await waitFor(() => expect(within(edit).getByRole('textbox', { name: 'Name' })).toHaveValue('Demo - Checkout API'));
  fireEvent.change(within(edit).getByRole('textbox', { name: 'Name' }), { target: { value: 'Checkout renamed' } });
  fireEvent.click(within(edit).getByRole('button', { name: 'Confirm' }));
  expect(await screen.findByText('#3 Checkout renamed')).toBeInTheDocument();
  expect(fetchMock.mock.calls.some(([url, options]) =>
    new URL(url).pathname.endsWith('/services/3') && options?.method === 'PATCH')).toBe(true);

  fireEvent.click(within(screen.getByText('#3 Checkout renamed').closest('li')!).getByTestId('MoreVertIcon').closest('button')!);
  fireEvent.click(screen.getByRole('menuitem', { name: 'Delete' }));
  const deleteDialog = await screen.findByRole('dialog', { name: 'Delete service?' });
  fireEvent.click(within(deleteDialog).getByRole('button', { name: 'Confirm' }));
  await waitFor(() => expect(store.getState().services.services.some(({ id }) => id === 3)).toBe(false));
});
