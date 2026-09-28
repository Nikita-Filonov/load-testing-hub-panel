import { expect, it } from 'vitest';
import { fireEvent, screen, within } from '@testing-library/react';
import { renderRoute, setupRouteTests } from '../../test/fixtures/routes';
import { ThemeMode } from '../../Models/Core/Theme';

setupRouteTests();

it('switches the application theme from its settings dialog', async () => {
  const store = renderRoute('/services/3/results');
  await screen.findByText(/#64 Load tests for/, {}, { timeout: 12000 });
  const header = screen.getByRole('banner');
  fireEvent.click(within(header).getByTestId('SettingsOutlinedIcon').closest('button')!);
  const dialog = await screen.findByRole('dialog', { name: 'App settings' });
  fireEvent.click(within(dialog).getByRole('radio', { name: /Dark/i }));
  expect(store.getState().core.theme.mode).toBe(ThemeMode.Dark);
  fireEvent.click(within(dialog).getByRole('button', { name: 'Cancel' }));
  expect(await screen.findByText(/#64 Load tests for/)).toBeInTheDocument();
});
