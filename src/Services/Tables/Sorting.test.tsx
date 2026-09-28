import { act, renderHook } from '@testing-library/react';
import { expect, it } from 'vitest';
import { useTableSorting } from './Sorting';

it('sorts nested values in both directions without changing the source list', () => {
  const items = [
    { id: 3, metric: { count: 20 } },
    { id: 1, metric: { count: 5 } },
    { id: 2, metric: { count: 12 } }
  ];
  const { result } = renderHook(() => useTableSorting({ items }));

  expect(result.current.sortedItems.map((item) => item.id)).toEqual([3, 1, 2]);

  act(() => result.current.setOrderBy('metric.count'));
  expect(result.current.sortedItems.map((item) => item.id)).toEqual([1, 2, 3]);

  act(() => result.current.setOrderDirection('desc'));
  expect(result.current.sortedItems.map((item) => item.id)).toEqual([3, 2, 1]);
  expect(items.map((item) => item.id)).toEqual([3, 1, 2]);
});
