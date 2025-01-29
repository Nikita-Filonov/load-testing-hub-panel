import { FC } from 'react';
import { BaseTable } from '../BaseTable';
import { ExceptionResultsTableHeader } from './ExceptionResultsTableHeader';
import { ExceptionResultsTableRow } from './ExceptionResultsTableRow';
import { ExceptionResult } from '../../../Models/Results/ExceptionResults';
import { useTableSorting } from '../../../Services/Tables/Sorting';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { TableType } from '../../../Models/Core/TableSettings';

type ExceptionResultsTableProps = {
  loading: boolean;
  results: ExceptionResult[];
  onViewDetails: (result: ExceptionResult) => void;
};

export const ExceptionResultsTable: FC<ExceptionResultsTableProps> = (props) => {
  const { results, loading, onViewDetails } = props;
  const { sortedItems, orderBy, setOrderBy, orderDirection, setOrderDirection } = useTableSorting({ items: results });

  const settings = useSelector((state: ReduxState) => state.core.tableSettings[TableType.ExceptionResultsTable]);

  return (
    <BaseTable
      loading={loading}
      containerSx={{ mt: 3 }}
      header={
        <ExceptionResultsTableHeader
          headers={settings.headers}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          orderDirection={orderDirection}
          setOrderDirection={setOrderDirection}
        />
      }>
      {sortedItems.map((result, index) => (
        <ExceptionResultsTableRow key={index} rows={settings.rows} result={result} onViewDetails={onViewDetails} />
      ))}
    </BaseTable>
  );
};
