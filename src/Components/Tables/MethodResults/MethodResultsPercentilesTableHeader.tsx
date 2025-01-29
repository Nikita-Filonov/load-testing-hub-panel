import { BaseTableHeader, SortingTableHeaderProps } from '../BaseTableHeader';
import { FC } from 'react';
import { HeaderSettings } from '../../../Models/Core/TableSettings';

type MethodResultsPercentilesTableHeaderProps = {
  headers: HeaderSettings[];
} & SortingTableHeaderProps;

export const MethodResultsPercentilesTableHeader: FC<MethodResultsPercentilesTableHeaderProps> = (props) => {
  const { headers, orderBy, setOrderBy, orderDirection, setOrderDirection } = props;

  return (
    <BaseTableHeader
      cells={[{ value: undefined }, ...headers]}
      orderBy={orderBy}
      setOrderBy={setOrderBy}
      orderDirection={orderDirection}
      setOrderDirection={setOrderDirection}
    />
  );
};
