import { FC, Fragment, useEffect } from 'react';
import TotalRequestsPerSecondChartView from './TotalRequestsPerSecondChartView';
import { useHistoryResults } from '../../../Providers/Results/HistoryResultsProvider';
import ResponseTimesChartView from './ResponseTimesChartView';
import NumberOfUsersChartView from './NumberOfUsersChartView';

type HistoryResultsChartsViewProps = {
  loadTestResultId: number;
};

export const HistoryResultsChartsView: FC<HistoryResultsChartsViewProps> = ({ loadTestResultId }) => {
  const { loading, getHistoryResults } = useHistoryResults();

  useEffect(() => {
    loadTestResultId && getHistoryResults({ loadTestResultId });
  }, [loadTestResultId]);

  return (
    <Fragment>
      <TotalRequestsPerSecondChartView loading={loading.getHistoryResults} />
      <ResponseTimesChartView loading={loading.getHistoryResults} />
      <NumberOfUsersChartView loading={loading.getHistoryResults} />
    </Fragment>
  );
};
