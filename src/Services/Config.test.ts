import { afterEach, describe, expect, it, vi } from 'vitest';
import { Config, SettingsManager } from './Config';

const runtimeConfig: Config = {
  serverUrl: 'https://api.example.com',
  apiVersion: '/api/v1',
  apiDateFormat: 'YYYY-MM-DD',
  apiTimeFormat: 'HH:mm:ss',
  durationFormat: 'm[m]s[s]',
  pickerDateFormat: 'dd.MM.yyyy',
  pickerTimeFormat: 'HH:mm'
};

describe('SettingsManager', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    SettingsManager.setup(null);
  });

  it('uses Vite variables when the runtime endpoint has no config', () => {
    vi.stubEnv('VITE_SERVER_URL', 'http://localhost:13000');
    vi.stubEnv('VITE_API_VERSION', '/api/v1');
    vi.stubEnv('VITE_API_DATE_FORMAT', 'YYYY-MM-DD');
    vi.stubEnv('VITE_API_TIME_FORMAT', 'HH:mm:ss');

    SettingsManager.setup(null);

    expect(SettingsManager.apiUrl).toBe('http://localhost:13000/api/v1');
    expect(SettingsManager.apiDateTimeFormat).toBe('YYYY-MM-DD HH:mm:ss');
  });

  it('uses container runtime config in preference to Vite defaults', () => {
    vi.stubEnv('VITE_SERVER_URL', 'http://localhost:8000');

    SettingsManager.setup(runtimeConfig);

    expect(SettingsManager.apiUrl).toBe('https://api.example.com/api/v1');
    expect(SettingsManager.pickerDateTimeFormat).toBe('dd.MM.yyyy HH:mm');
    expect(SettingsManager.getStaticFileUrl('logo.svg')).toBe('https://api.example.com/static/logo.svg');
  });
});
