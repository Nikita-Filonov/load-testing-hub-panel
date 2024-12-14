import { BaseTableRow } from '../BaseTableRow';
import { FC } from 'react';
import { CompareMetric } from '../../../Models/Compares/Compares';
import { CompareCell } from './CompareCell';

type CompareMetricTableRowProps = {
  metric: string;
  compare: CompareMetric;
};

export const CompareMetricTableRow: FC<CompareMetricTableRowProps> = (props) => {
  const { metric, compare } = props;

  return (
    <BaseTableRow
      hover
      cells={[
        { value: metric },
        { value: compare.actual },
        { value: compare.expected },
        { value: <CompareCell compare={compare.compare} /> }
      ]}
    />
  );
};
