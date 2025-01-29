import { BaseTableHeader, SortingTableHeaderProps } from '../BaseTableHeader';
import { FC } from 'react';

export const PercentilesTableHeader: FC<SortingTableHeaderProps> = (props) => {
  const { orderBy, setOrderBy, orderDirection, setOrderDirection } = props;

  return (
    <BaseTableHeader
      cells={[
        { value: 'Percentile', orderKey: 'percentileOrder' },
        { value: 'Average', orderKey: 'average' }
      ]}
      orderBy={orderBy}
      setOrderBy={setOrderBy}
      orderDirection={orderDirection}
      setOrderDirection={setOrderDirection}
    />
  );
};
