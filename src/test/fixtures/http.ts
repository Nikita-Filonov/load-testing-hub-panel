import { vi } from 'vitest';

export const mockSuccessfulFetch = (response: unknown = {}) => {
  const fetchMock = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => response
  });
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
};

export const readFetchCall = (fetchMock: ReturnType<typeof mockSuccessfulFetch>, index = 0) => {
  const [url, request] = fetchMock.mock.calls[index] as [string, RequestInit];
  return { url, method: request.method, body: request.body && JSON.parse(request.body as string) };
};
