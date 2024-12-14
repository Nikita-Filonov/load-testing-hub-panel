import { FC, Fragment, useMemo } from 'react';
import { BaseTable } from '../BaseTable';
import { MethodResultCompare } from '../../../Models/Compares/Compares';
import { CompareMetricTableRow } from './CompareMetricTableRow';
import { MethodResultsCompareTableRow } from './MethodResultsCompareTableRow';
import { MethodResultsCompareTableHeader } from './MethodResultsCompareTableHeader';
import { CompareTableSettings } from '../../../Models/Compares/CompareTableSettings';
import { filterEnabledCompareTableRowSettings, sortCompareTableRowSettings } from '../../../Services/Compares/Utils';

type MethodResultsCompareTableProps = {
  compares: MethodResultCompare[];
  settings: CompareTableSettings<MethodResultCompare>;
};

export const MethodResultsCompareTable: FC<MethodResultsCompareTableProps> = (props) => {
  const { compares, settings } = props;

  const rows = useMemo(
    () => [...settings.rows].sort(sortCompareTableRowSettings).filter(filterEnabledCompareTableRowSettings),
    [settings.rows]
  );

  return (
    <BaseTable loading={false} header={<MethodResultsCompareTableHeader />} containerSx={{ mt: 3 }}>
      {compares.map((compare, index) => (
        <Fragment key={index}>
          <MethodResultsCompareTableRow compare={compare} numberOfRows={rows.length} />
          {rows.map((row) => (
            <CompareMetricTableRow key={row.index} metric={row.metricName} compare={compare[row.metricValue]} />
          ))}
        </Fragment>
      ))}
    </BaseTable>
  );
};
