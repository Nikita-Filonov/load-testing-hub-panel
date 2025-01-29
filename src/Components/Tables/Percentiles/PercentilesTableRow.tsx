import { BaseTableRow } from '../BaseTableRow';
import { FC } from 'react';
import { MetricName } from '../../../Models/Metrics/Base';

type PercentilesTableRowProps = {
  average: number;
  percentile: MetricName;
};

export const PercentilesTableRow: FC<PercentilesTableRowProps> = (props) => {
  const { average, percentile } = props;

  return <BaseTableRow hover cells={[{ value: percentile }, { value: average }]} />;
};
