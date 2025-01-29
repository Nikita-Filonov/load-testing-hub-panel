import _ from 'lodash';
import { useMemo, useState } from 'react';

function descendingComparator<T>(a: T, b: T, orderBy: string | null): number {
  if (orderBy === null) {
    return 0;
  }

  const aValue = _.get(a, orderBy) || 0;
  const bValue = _.get(b, orderBy) || 0;

  if (bValue < aValue) {
    return -1;
  }
  if (bValue > aValue) {
    return 1;
  }

  return 0;
}

export type OrderDirection = 'asc' | 'desc';

const getComparator = <T>(order: OrderDirection, orderBy: string | null): ((a: T, b: T) => number) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

type UseSortingProps<T> = {
  items: T[];
};

export const useTableSorting = <T>({ items }: UseSortingProps<T>) => {
  const [orderBy, setOrderBy] = useState<string | null>(null);
  const [orderDirection, setOrderDirection] = useState<OrderDirection>('asc');

  const sortedItems = useMemo(
    () => [...items].sort(getComparator(orderDirection, orderBy)),
    [orderBy, orderDirection, items]
  );

  return { sortedItems, orderBy, orderDirection, setOrderBy, setOrderDirection };
};
