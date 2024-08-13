import { BaseChartView } from '../../Components/Charts/BaseChartView';
import { dateTimeValueFormatter } from '../../Services/Charts/Utils';
import { FC, useMemo } from 'react';
import dayjs from 'dayjs';
import { BaseBarChart } from '../../Components/Charts/BaseBarChart';
import { NumberOfRequestsAnalytics } from '../../Models/Analytics/NumberOfRequestsAnalytics';
import { green, red } from '@mui/material/colors';

const valueFormatter = dateTimeValueFormatter;

type NumberOfRequestsAnalyticsViewProps = {
  title: string;
  loading: boolean;
  analytics: NumberOfRequestsAnalytics[];
};

export const NumberOfRequestsAnalyticsView: FC<NumberOfRequestsAnalyticsViewProps> = (props) => {
  const { title, loading, analytics } = props;

  const datetimeData = useMemo(() => analytics.map((analytic) => dayjs(analytic.datetime).toDate()), [analytics]);

  return (
    <BaseChartView title={title} loading={loading}>
      <BaseBarChart
        xAxis={[
          { data: datetimeData, scaleType: 'band', valueFormatter },
          { data: datetimeData, scaleType: 'band', valueFormatter }
        ]}
        yAxis={[
          {
            data: analytics.map((result) => result.numberOfRequests),
            label: 'Total requests',
            color: green['500']
          },
          {
            data: analytics.map((result) => result.numberOfFailures),
            label: 'Total Failures',
            color: red['300']
          }
        ]}
      />
    </BaseChartView>
  );
};
