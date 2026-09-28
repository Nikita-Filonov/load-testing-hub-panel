import { afterEach, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ConfigProvider } from './ConfigProvider';
import { SettingsManager } from '../Services/Config';

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

it('waits for runtime config before rendering the application', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({ serverUrl: 'https://api.example.com', apiVersion: '/api/v1' })
  }));

  render(<ConfigProvider><span>Application ready</span></ConfigProvider>);

  expect(screen.queryByText('Application ready')).not.toBeInTheDocument();
  expect(await screen.findByText('Application ready')).toBeInTheDocument();
  expect(SettingsManager.apiUrl).toBe('https://api.example.com/api/v1');
});

it('falls back to Vite config when the runtime endpoint is unavailable', async () => {
  vi.stubEnv('VITE_SERVER_URL', 'http://localhost:13000');
  vi.stubEnv('VITE_API_VERSION', '/api/v1');
  vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));

  render(<ConfigProvider><span>Application ready</span></ConfigProvider>);

  expect(await screen.findByText('Application ready')).toBeInTheDocument();
  expect(SettingsManager.apiUrl).toBe('http://localhost:13000/api/v1');
});
