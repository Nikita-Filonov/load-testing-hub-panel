import { afterEach, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { BaseRouterLink } from './BaseRouterLink';
import { SettingsManager } from '../../Services/Config';
import userEvent from '@testing-library/user-event';

afterEach(() => vi.restoreAllMocks());

it.each([
  [undefined, `${SettingsManager.appUrl}/services/3/results`],
  ['https://panel.example.test/shared-result', 'https://panel.example.test/shared-result']
])('copies the configured URL (%s) while preserving its navigation target', async (copyURL, expected) => {
  userEvent.setup();
  const writeText = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue(undefined);
  render(<MemoryRouter><BaseRouterLink to="/services/3/results" allowCopy copyURL={copyURL}>
    Results
  </BaseRouterLink></MemoryRouter>);
  expect(screen.getByRole('link', { name: 'Results' })).toHaveAttribute('href', '/services/3/results');
  fireEvent.click(screen.getByTestId('LinkIcon').closest('button')!);
  await waitFor(() => expect(writeText).toHaveBeenCalledWith(expected));
});
