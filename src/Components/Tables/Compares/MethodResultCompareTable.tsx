import { FC, useMemo } from 'react';
import { BaseTable } from '../BaseTable';
import { MethodResultCompare } from '../../../Models/Compares/Compares';
import { CompareMetricTableRow } from './CompareMetricTableRow';
import { CompareMetricTableHeader } from './CompareMetricTableHeader';
import { CompareTableSettings } from '../../../Models/Compares/CompareTableSettings';
import { filterEnabledCompareTableRowSettings, sortCompareTableRowSettings } from '../../../Services/Compares/Utils';

type MethodResultCompareTableProps = {
  compare: MethodResultCompare;
  settings: CompareTableSettings<MethodResultCompare>;
};

export const MethodResultCompareTable: FC<MethodResultCompareTableProps> = (props) => {
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
