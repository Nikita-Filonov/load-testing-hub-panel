import { FC, Fragment, useEffect } from 'react';
import { useHistoryResults } from '../../../Providers/Results/HistoryResultsProvider';
import TotalRequestsPerSecondCompareChartView from './TotalRequestsPerSecondCompareChartView';
import ResponseTimesCompareChartView from './ResponseTimesCompareChartView';
import NumberOfUsersCompareChartView from './NumberOfUsersCompareChartView';

type HistoryResultsCompareChartsViewProps = {
  loadTestResultId: number;
};

export const HistoryResultsCompareChartsView: FC<HistoryResultsCompareChartsViewProps> = ({ loadTestResultId }) => {
  const { loading, getHistoryResultsCompare } = useHistoryResults();

  useEffect(() => {
    loadTestResultId && getHistoryResultsCompare({ loadTestResultId });
  }, [loadTestResultId]);

  return (
    <Fragment>
      <TotalRequestsPerSecondCompareChartView loading={loading.getHistoryResultsCompare} />
      <ResponseTimesCompareChartView loading={loading.getHistoryResultsCompare} />
      <NumberOfUsersCompareChartView loading={loading.getHistoryResultsCompare} />
    </Fragment>
  );
};
