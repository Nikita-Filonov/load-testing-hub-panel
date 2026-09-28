import { expect, it, vi } from 'vitest';
import { act, screen } from '@testing-library/react';

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
  vi.unstubAllGlobals();
}, 15000);
