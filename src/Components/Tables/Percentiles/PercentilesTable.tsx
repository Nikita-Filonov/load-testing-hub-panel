import { FC } from 'react';
import { BaseTable } from '../BaseTable';
import { useTableSorting } from '../../../Services/Tables/Sorting';
import { PercentilesTableHeader } from './PercentilesTableHeader';
import { MetricName } from '../../../Models/Metrics/Base';
import { PercentilesTableRow } from './PercentilesTableRow';
import { Percentiles } from '../../../Models/Metrics/Percentiles';

type PercentilesTableProps = {
  percentiles: Percentiles;
};

export const PercentilesTable: FC<PercentilesTableProps> = ({ percentiles }) => {
  const { sortedItems, orderBy, setOrderBy, orderDirection, setOrderDirection } = useTableSorting({
    items: [
      {
        percentile: MetricName.ResponseTimePercentile50,
        percentileOrder: 50,
        average: percentiles.responseTimePercentile50
      },
      {
        percentile: MetricName.ResponseTimePercentile60,
        percentileOrder: 60,
        average: percentiles.responseTimePercentile60
      },
      {
        percentile: MetricName.ResponseTimePercentile70,
        percentileOrder: 70,
        average: percentiles.responseTimePercentile70
      },
      {
        percentile: MetricName.ResponseTimePercentile80,
        percentileOrder: 80,
        average: percentiles.responseTimePercentile80
      },
      {
        percentile: MetricName.ResponseTimePercentile90,
        percentileOrder: 90,
        average: percentiles.responseTimePercentile90
      },
      {
        percentile: MetricName.ResponseTimePercentile95,
        percentileOrder: 95,
        average: percentiles.responseTimePercentile95
      },
      {
        percentile: MetricName.ResponseTimePercentile99,
        percentileOrder: 99,
        average: percentiles.responseTimePercentile99
      },
      {
        percentile: MetricName.ResponseTimePercentile100,
        percentileOrder: 100,
        average: percentiles.responseTimePercentile100
      }
    ]
  });

  return (
    <BaseTable
      loading={false}
      containerSx={{ mt: 3 }}
      header={
        <PercentilesTableHeader
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          orderDirection={orderDirection}
          setOrderDirection={setOrderDirection}
        />
      }>
      {sortedItems.map((item, index) => (
        <PercentilesTableRow key={index} average={item.average} percentile={item.percentile} />
      ))}
    </BaseTable>
  );
};
