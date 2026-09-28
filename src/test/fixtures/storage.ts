import { vi } from 'vitest';

export const createStorageFixture = (saved: Record<string, string> = {}) => {
  const entries = new Map(Object.entries(saved));
  const driver = {
    getItem: vi.fn((key: string) => entries.get(key) ?? null),
    setItem: vi.fn((key: string, value: string) => {
      entries.set(key, value);
    })
  };

  return { driver, entries };
};

export const encodeLegacyState = (state: Record<string, unknown>, version = 1) =>
  JSON.stringify({
    ...Object.fromEntries(Object.entries(state).map(([key, value]) => [key, JSON.stringify(value)])),
    _persist: JSON.stringify({ version, rehydrated: true })
  });
