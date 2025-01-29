import { FC } from 'react';
import { BaseTable } from '../BaseTable';
import { MethodResult } from '../../../Models/Results/MethodResults';
import { MethodResultsPercentilesTableHeader } from './MethodResultsPercentilesTableHeader';
import { MethodResultsPercentilesTableRow } from './MethodResultsPercentilesTableRow';
import { useTableSorting } from '../../../Services/Tables/Sorting';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { TableType } from '../../../Models/Core/TableSettings';

type MethodResultsPercentilesTableProps = {
  results: MethodResult[];
  onMethodResultDetails: (result: MethodResult) => void;
};

export const MethodResultsPercentilesTable: FC<MethodResultsPercentilesTableProps> = (props) => {
  const { results, onMethodResultDetails } = props;
  const { sortedItems, orderBy, setOrderBy, orderDirection, setOrderDirection } = useTableSorting({ items: results });

  const settings = useSelector(
    (state: ReduxState) => state.core.tableSettings[TableType.MethodResultsPercentilesTable]
  );

  return (
    <BaseTable
      loading={false}
      containerSx={{ mt: 3 }}
      header={
        <MethodResultsPercentilesTableHeader
          headers={settings.headers}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          orderDirection={orderDirection}
          setOrderDirection={setOrderDirection}
        />
      }>
      {sortedItems.map((result, index) => (
        <MethodResultsPercentilesTableRow
          key={index}
          rows={settings.rows}
          result={result}
          onMethodResultDetails={onMethodResultDetails}
        />
      ))}
    </BaseTable>
  );
};
