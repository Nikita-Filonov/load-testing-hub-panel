import { afterEach, expect, it, vi } from 'vitest';
import { act, screen } from '@testing-library/react';
import { createRoot } from 'react-dom/client';
import { SettingsManager } from './Services/Config';

vi.mock('react-dom/client', async (importOriginal) => {
  const client = await importOriginal<typeof import('react-dom/client')>();
  return { ...client, createRoot: vi.fn(client.createRoot) };
});

afterEach(async () => {
  const root = vi.mocked(createRoot).mock.results.find(({ type }) => type === 'return')?.value;
  if (root) await act(async () => root.unmount());
  vi.unstubAllGlobals();
  SettingsManager.setup(null);
});

it('boots the application at the services route with runtime configuration', async () => {
  document.body.innerHTML = '<div id="root"></div>';
  window.history.replaceState({}, '', '/services');
  const fetchMock = vi.fn().mockImplementation(async (url: string) => ({
    ok: true,
    status: 200,
    json: async () => url === '/config'
      ? { serverUrl: 'https://api.example.com', apiVersion: '/api/v1' }
      : { services: [{ id: 7, name: 'Checkout', url: 'https://checkout.example.com',
        numberOfScenarios: 2, numberOfLoadTestResults: 3 }] }
  }));
  vi.stubGlobal('fetch', fetchMock);

  await act(async () => {
    await import('./index');
  });

  expect(await screen.findByText('#7 Checkout')).toBeInTheDocument();
  expect(fetchMock.mock.calls.map(([url]) => url)).toContain('https://api.example.com/api/v1/services');
}, 15000);
