import { BaseTableHeader, SortingTableHeaderProps, TableHeaderCell } from '../BaseTableHeader';
import { FC } from 'react';

type Props = {
  allowCompareMethodResultsHistory?: boolean;
} & SortingTableHeaderProps;

export const MethodResultsCompareTableHeader: FC<Props> = (props) => {
  const { orderBy, setOrderBy, orderDirection, setOrderDirection, allowCompareMethodResultsHistory } = props;
  const cells: TableHeaderCell[] = [
    { value: 'Method', orderKey: 'method' },
    { value: 'Metric' },
    { value: 'Actual' },
    { value: 'Expected' },
    { value: 'Compare (%)' }
  ];

  if (allowCompareMethodResultsHistory) {
    cells.unshift({ value: undefined });
  }

  return (
    <BaseTableHeader
      cells={cells}
      orderBy={orderBy}
      setOrderBy={setOrderBy}
      orderDirection={orderDirection}
      setOrderDirection={setOrderDirection}
    />
  );
};
