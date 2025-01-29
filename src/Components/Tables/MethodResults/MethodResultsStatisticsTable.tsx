import { FC } from 'react';
import { BaseTable } from '../BaseTable';
import { MethodResultsStatisticsTableHeader } from './MethodResultsStatisticsTableHeader';
import { MethodResultsStatisticsTableRow } from './MethodResultsStatisticsTableRow';
import { MethodResult } from '../../../Models/Results/MethodResults';
import { useTableSorting } from '../../../Services/Tables/Sorting';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { TableType } from '../../../Models/Core/TableSettings';

type MethodResultsStatisticsTableProps = {
  results: MethodResult[];
  onMethodResultDetails: (result: MethodResult) => void;
};

export const MethodResultsStatisticsTable: FC<MethodResultsStatisticsTableProps> = (props) => {
  const { results, onMethodResultDetails } = props;
  const { sortedItems, orderBy, setOrderBy, orderDirection, setOrderDirection } = useTableSorting({ items: results });

  const settings = useSelector((state: ReduxState) => state.core.tableSettings[TableType.MethodResultsStatisticsTable]);

  return (
    <BaseTable
      loading={false}
      containerSx={{ mt: 3 }}
      header={
        <MethodResultsStatisticsTableHeader
          headers={settings.headers}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          orderDirection={orderDirection}
          setOrderDirection={setOrderDirection}
        />
      }>
      {sortedItems.map((result, index) => (
        <MethodResultsStatisticsTableRow
          key={index}
          rows={settings.rows}
          result={result}
          onMethodResultDetails={onMethodResultDetails}
        />
      ))}
    </BaseTable>
  );
};
