import { FC, Fragment, useMemo } from 'react';
import { BaseTable } from '../BaseTable';
import { MethodResultCompare } from '../../../Models/Compares/Compares';
import { CompareMetricTableRow } from './CompareMetricTableRow';
import { MethodResultsCompareTableRow } from './MethodResultsCompareTableRow';
import { MethodResultsCompareTableHeader } from './MethodResultsCompareTableHeader';
import { CompareTableSettings } from '../../../Models/Compares/CompareTableSettings';
import { filterEnabledCompareTableRowSettings, sortCompareTableRowSettings } from '../../../Services/Compares/Utils';
import { useTableSorting } from '../../../Services/Tables/Sorting';

type MethodResultsCompareTableProps = {
  compares: MethodResultCompare[];
  settings: CompareTableSettings<MethodResultCompare>;
  onCompareMethodResultsHistory?: (compare: MethodResultCompare) => void;
};

export const MethodResultsCompareTable: FC<MethodResultsCompareTableProps> = (props) => {
  const { compares, settings, onCompareMethodResultsHistory } = props;
  const { sortedItems, orderBy, setOrderBy, orderDirection, setOrderDirection } = useTableSorting({ items: compares });

  const rows = useMemo(
    () => [...settings.rows].sort(sortCompareTableRowSettings).filter(filterEnabledCompareTableRowSettings),
    [settings.rows]
  );

  return (
    <BaseTable
      loading={false}
      header={
        <MethodResultsCompareTableHeader
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          orderDirection={orderDirection}
          setOrderDirection={setOrderDirection}
          allowCompareMethodResultsHistory={Boolean(onCompareMethodResultsHistory)}
        />
      }
      containerSx={{ mt: 3 }}>
      {sortedItems.map((compare, index) => (
        <Fragment key={index}>
          <MethodResultsCompareTableRow
            compare={compare}
            numberOfRows={rows.length}
            onCompareMethodResultsHistory={onCompareMethodResultsHistory}
          />
          {rows.map((row) => (
            <CompareMetricTableRow key={row.index} metric={row.metricName} compare={compare[row.metricValue]} />
          ))}
        </Fragment>
      ))}
    </BaseTable>
  );
};
