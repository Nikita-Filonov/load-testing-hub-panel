import { afterEach, describe, expect, it, vi } from 'vitest';
import { HTTPClient } from './HTTPClient';
import { getQueryString, getValidationError } from './Utils';

describe('HTTPClient', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('serializes repeated query values and returns a successful response', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200, json: async () => ({ items: [1] }) });
    vi.stubGlobal('fetch', fetchMock);

    const response = await new HTTPClient({ baseUrl: 'https://api.example.com' }).get({
      url: '/services', query: { tags: ['latest', 'experiment'], offset: null }
    });

    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.example.com/services?tags=latest&tags=experiment',
      expect.objectContaining({ method: 'GET' })
    );
    expect(response).toEqual({ error: false, response: { items: [1] }, validationErrors: null });
  });

  it('returns field errors from an HTTP 422 response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      status: 422,
      json: async () => ({ detail: [{ loc: ['body', 'name'], msg: 'Required' }] })
    }));

    const response = await new HTTPClient().post({ url: '/services', body: { name: '' } });

    expect(response.validationErrors).toEqual([{ loc: ['body', 'name'], msg: 'Required' }]);
    expect(getValidationError({ location: 'body.name', validationErrors: response.validationErrors ?? [] })?.msg)
      .toBe('Required');
  });

  it('returns a recoverable error when the network is unavailable', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));

    await expect(new HTTPClient().get({ url: '/services' })).resolves.toEqual({
      error: true, response: null, validationErrors: null
    });
    expect(getQueryString({ empty: null })).toBe('');
  });
});
