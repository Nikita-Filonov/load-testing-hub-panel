import { expect, it } from 'vitest';
import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import { renderRoute, setupRouteTests } from '../../test/fixtures/routes';
import { mockDemoApi } from '../../test/fixtures/api';

setupRouteTests();

it('filters aggregated methods and resets the server query', async () => {
  const fetchMock = mockDemoApi();
  renderRoute('/services/3/methods');
  const search = await screen.findByPlaceholderText('Search by method', {}, { timeout: 12000 });
  fireEvent.change(search, { target: { value: 'cart' } });
  expect(screen.getByText('GET /cart')).toBeInTheDocument();
  expect(screen.queryByText('POST /checkout')).not.toBeInTheDocument();
  fireEvent.change(search, { target: { value: '' } });

  fireEvent.click(screen.getByTestId('FilterAltOutlinedIcon').closest('button')!);
  const dialog = await screen.findByRole('dialog', { name: 'Methods filters' });
  fireEvent.change(within(dialog).getByRole('textbox', { name: 'Method' }), { target: { value: '/cart' } });
  fireEvent.mouseDown(within(dialog).getByRole('combobox', { name: 'Protocol' }));
  fireEvent.click(screen.getByRole('option', { name: 'HTTP' }));
  fireEvent.click(within(dialog).getByRole('button', { name: 'Confirm' }));
  await waitFor(() => {
    const last = fetchMock.mock.calls.filter(([url]) => new URL(url).pathname.endsWith('/methods')).at(-1)!;
    const query = new URL(last[0]).searchParams;
    expect(query.get('method')).toBe('/cart');
    expect(query.get('protocol')).toBe('http');
  });

  fireEvent.click(screen.getByTestId('FilterAltOutlinedIcon').closest('button')!);
  const resetDialog = await screen.findByRole('dialog', { name: 'Methods filters' });
  fireEvent.click(within(resetDialog).getByRole('button', { name: 'Reset filters' }));
  await waitFor(() => {
    const last = fetchMock.mock.calls.filter(([url]) => new URL(url).pathname.endsWith('/methods')).at(-1)!;
    expect(new URL(last[0]).searchParams.has('method')).toBe(false);
    expect(new URL(last[0]).searchParams.has('protocol')).toBe(false);
  });
});
