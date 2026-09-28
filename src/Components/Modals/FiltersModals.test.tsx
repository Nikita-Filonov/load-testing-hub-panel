import { expect, it, vi } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { AnalyticsFiltersModal } from './Analytics/AnalyticsFiltersModal';
import { LoadTestResultsFiltersModal } from './Results/LoadTestsResults/LoadTestResultsFiltersModal';
import { MethodsFiltersModal } from './Methods/MethodsFiltersModal';

vi.mock('../Pickers/BaseDateTimePicker', () => ({
  BaseDateTimePicker: ({ label, value, onChange }: {
    label: string; value?: string | null; onChange: (value: string | null) => void
  }) => <input aria-label={label} value={value ?? ''} onChange={(event) => onChange(event.target.value || null)} />
}));

it('confirms edited analytics dates and resets to the default interval', () => {
  const setModal = vi.fn();
  const setFilters = vi.fn();
  render(<AnalyticsFiltersModal modal setModal={setModal} setFilters={setFilters}
    filters={{ startDatetime: '2026-09-01T00:00:00', endDatetime: '2026-09-02T00:00:00' }} />);
  const dialog = screen.getByRole('dialog', { name: 'Analytics filters' });
  fireEvent.change(within(dialog).getByRole('textbox', { name: 'Start datetime' }), {
    target: { value: '2026-09-03T00:00:00' }
  });
  fireEvent.change(within(dialog).getByRole('textbox', { name: 'End datetime' }), {
    target: { value: '2026-09-04T00:00:00' }
  });
  fireEvent.click(within(dialog).getByRole('button', { name: 'Confirm' }));
  expect(setFilters).toHaveBeenCalledWith({
    startDatetime: '2026-09-03T00:00:00', endDatetime: '2026-09-04T00:00:00'
  });
  fireEvent.click(within(dialog).getByRole('button', { name: 'Reset filters' }));
  expect(setFilters).toHaveBeenCalledTimes(2);
  expect(setFilters.mock.calls[1][0]).toMatchObject({
    startDatetime: expect.any(String), endDatetime: expect.any(String)
  });
  expect(setModal).toHaveBeenCalledWith(false);
});

it('confirms result version and time filters, then clears them', () => {
  const setFilters = vi.fn();
  render(<LoadTestResultsFiltersModal modal setModal={vi.fn()} setFilters={setFilters}
    filters={{ startedAt: null, finishedAt: null, triggerCIProjectVersion: null }} />);
  const dialog = screen.getByRole('dialog', { name: 'Load tests results filters' });
  fireEvent.change(within(dialog).getByRole('textbox', { name: 'Version' }), {
    target: { value: 'release-2026' }
  });
  fireEvent.change(within(dialog).getByRole('textbox', { name: 'Started at' }), {
    target: { value: '2026-09-01T00:00:00' }
  });
  fireEvent.change(within(dialog).getByRole('textbox', { name: 'Finished at' }), {
    target: { value: '2026-09-02T00:00:00' }
  });
  fireEvent.click(within(dialog).getByRole('button', { name: 'Confirm' }));
  expect(setFilters).toHaveBeenCalledWith({
    startedAt: '2026-09-01T00:00:00', finishedAt: '2026-09-02T00:00:00',
    triggerCIProjectVersion: 'release-2026'
  });
  fireEvent.click(within(dialog).getByRole('button', { name: 'Reset filters' }));
  expect(setFilters).toHaveBeenLastCalledWith({
    startedAt: null, finishedAt: null, triggerCIProjectVersion: null
  });
});

it('preserves required method dates when cleared and confirms a valid interval', () => {
  const setFilters = vi.fn();
  const filters = {
    method: null, protocol: null,
    startDatetime: '2026-09-01T00:00:00', endDatetime: '2026-09-02T00:00:00'
  };
  render(<MethodsFiltersModal modal setModal={vi.fn()} setFilters={setFilters} filters={filters} />);
  const dialog = screen.getByRole('dialog', { name: 'Methods filters' });
  const start = within(dialog).getByRole('textbox', { name: 'Start datetime' });
  const end = within(dialog).getByRole('textbox', { name: 'End datetime' });
  fireEvent.change(start, { target: { value: '' } });
  fireEvent.change(end, { target: { value: '' } });
  fireEvent.click(within(dialog).getByRole('button', { name: 'Confirm' }));
  expect(setFilters).toHaveBeenLastCalledWith(filters);

  fireEvent.change(start, { target: { value: '2026-09-03T00:00:00' } });
  fireEvent.change(end, { target: { value: '2026-09-04T00:00:00' } });
  fireEvent.click(within(dialog).getByRole('button', { name: 'Confirm' }));
  expect(setFilters).toHaveBeenLastCalledWith({
    ...filters, startDatetime: '2026-09-03T00:00:00', endDatetime: '2026-09-04T00:00:00'
  });
});
