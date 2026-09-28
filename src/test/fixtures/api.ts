import { vi } from 'vitest';
import responses from './apiResponses.json';

const apiResponses = responses as Record<string, unknown>;

const normalizePath = (path: string): string => {
  if (path in apiResponses) return path;
  if (/^\/services\/\d+$/.test(path)) return '/services/3';
  if (/^\/services\/details\/\d+$/.test(path)) return '/services/details/3';
  if (/^\/scenarios\/\d+$/.test(path)) return '/scenarios/5';
  if (/^\/scenarios\/details\/\d+$/.test(path)) return '/scenarios/details/5';
  if (/^\/scenario-settings\/\d+$/.test(path)) return '/scenario-settings/5';
  if (/^\/integrations\/\d+$/.test(path)) return '/integrations/3';
  if (/^\/load-test-results\/details\/\d+$/.test(path)) {
    return Object.keys(apiResponses).find((key) => key.startsWith('/load-test-results/details/'))!;
  }
  if (/^\/method-results\/details\/\d+$/.test(path)) {
    return Object.keys(apiResponses).find((key) => key.startsWith('/method-results/details/'))!;
  }
  if (/^\/ratio-results\/\d+$/.test(path)) {
    return Object.keys(apiResponses).find((key) => key.startsWith('/ratio-results/'))!;
  }
  if (/^\/compare-settings\/\d+$/.test(path)) return '/compare-settings/3';
  return path;
};

type ErrorResponse = { status: number; body: unknown };

export const mockDemoApi = (
  overrides: Record<string, unknown> = {},
  errors: Record<string, ErrorResponse> = {}
) => {
  const fetchMock = vi.fn(async (url: string, options?: RequestInit) => {
    const path = new URL(url).pathname.replace(/^\/api\/v1/, '');
    const key = normalizePath(path);
    const methodKey = `${options?.method ?? 'GET'} ${path}`;
    if (methodKey in errors) {
      const error = errors[methodKey];
      return { ok: false, status: error.status, json: async () => structuredClone(error.body) };
    }
    if (!(methodKey in overrides) && !(key in apiResponses)) throw new Error(`Missing demo API response: ${methodKey}`);
    return {
      ok: true,
      status: 200,
      json: async () => structuredClone(methodKey in overrides ? overrides[methodKey] : apiResponses[key])
    };
  });
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
};
