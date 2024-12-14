import { FC, useMemo } from 'react';
import { BaseTable } from '../BaseTable';
import { LoadTestResultCompare } from '../../../Models/Compares/Compares';
import { CompareMetricTableHeader } from './CompareMetricTableHeader';
import { CompareMetricTableRow } from './CompareMetricTableRow';
import { CompareTableSettings } from '../../../Models/Compares/CompareTableSettings';
import { filterEnabledCompareTableRowSettings, sortCompareTableRowSettings } from '../../../Services/Compares/Utils';

type LoadTestResultCompareTableProps = {
  compare: LoadTestResultCompare;
  settings: CompareTableSettings<LoadTestResultCompare>;
};

export const LoadTestResultCompareTable: FC<LoadTestResultCompareTableProps> = (props) => {
  const { compare, settings } = props;

  const rows = useMemo(
    () => [...settings.rows].sort(sortCompareTableRowSettings).filter(filterEnabledCompareTableRowSettings),
    [settings.rows]
  );

  return (
    <BaseTable loading={false} header={<CompareMetricTableHeader />} containerSx={{ mt: 3 }}>
      {rows.map((row) => (
        <CompareMetricTableRow key={row.index} metric={row.metricName} compare={compare[row.metricValue]} />
      ))}
    </BaseTable>
  );
};
