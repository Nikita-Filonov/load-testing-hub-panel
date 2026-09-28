import { afterEach, describe, expect, it, vi } from 'vitest';
import { ProtocolType } from '../../Models/Results/MethodResults';
import { buildMethodURL, getDefaultMethodsFilters, getMethodLabel } from './Utils';
import { SettingsManager } from '../Config';

describe('method navigation and filters', () => {
  afterEach(() => {
    vi.useRealTimers();
    SettingsManager.setup(null);
  });

  it.each([
    [ProtocolType.GRPC, 'package.Service/CreateOrder', 'CreateOrder'],
    [ProtocolType.HTTP, 'POST /orders', 'POST /orders'],
    [ProtocolType.KAFKA, 'orders.created', 'orders.created']
  ])('shows the right label for %s', (protocol, method, label) => {
    expect(getMethodLabel({ method, protocol })).toBe(label);
  });

  it('preserves the full method and protocol in the detail link', () => {
    const url = new URL(buildMethodURL({ serviceId: 7, method: 'pkg/Order.Create', protocol: ProtocolType.GRPC }));
    expect(url.pathname).toBe('/services/7/methods/details');
    expect(url.searchParams.get('method')).toBe('pkg/Order.Create');
    expect(url.searchParams.get('protocol')).toBe('grpc');
  });

  it('initializes the analytics date window around today', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-09-28T12:00:00'));
    SettingsManager.setup({ serverUrl: '', apiVersion: '', apiDateFormat: 'YYYY-MM-DD',
      apiTimeFormat: 'HH:mm:ss', durationFormat: '', pickerDateFormat: '', pickerTimeFormat: '' });
    const filters = getDefaultMethodsFilters();
    expect(filters.method).toBeNull();
    expect(filters.protocol).toBeNull();
    expect(filters.startDatetime).toContain('2026-09-14');
    expect(filters.endDatetime).toContain('2026-10-12');
  });
});
