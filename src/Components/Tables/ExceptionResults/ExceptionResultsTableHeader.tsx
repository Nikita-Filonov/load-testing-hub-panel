import { BaseTableHeader, SortingTableHeaderProps } from '../BaseTableHeader';
import { FC } from 'react';
import { HeaderSettings } from '../../../Models/Core/TableSettings';

type ExceptionResultsTableHeaderProps = {
  headers: HeaderSettings[];
} & SortingTableHeaderProps;

export const ExceptionResultsTableHeader: FC<ExceptionResultsTableHeaderProps> = (props) => {
  const { headers, orderBy, setOrderBy, orderDirection, setOrderDirection } = props;

  return (
    <BaseTableHeader
      cells={[...headers, { value: undefined }]}
      orderBy={orderBy}
      setOrderBy={setOrderBy}
      orderDirection={orderDirection}
      setOrderDirection={setOrderDirection}
    />
  );
};
