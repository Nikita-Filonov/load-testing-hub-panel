import { LoadTestResultScenarioCompare } from '../../../Models/Results/LoadTestResults';
import { FC, useEffect, useMemo } from 'react';
import { LoadTestResultCompareChartView } from './LoadTestResultCompareChartView';
import { useLoadTestResults } from '../../../Providers/Results/LoadTestResultsProvider';
import { connect } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { getLoadTestResultCompareTitle } from '../../../Services/Results/Utils';

type LoadTestResultScenarioCompareViewProps = {
  compare: LoadTestResultScenarioCompare;
  loadTestResultId: number;
};

const LoadTestResultScenarioCompareView: FC<LoadTestResultScenarioCompareViewProps> = (props) => {
  const { compare, loadTestResultId } = props;
  const { loading, getLoadTestResultScenarioCompare } = useLoadTestResults();

  useEffect(() => {
    loadTestResultId && getLoadTestResultScenarioCompare({ loadTestResultId });
  }, [loadTestResultId]);

  const title = useMemo(
    () =>
      getLoadTestResultCompareTitle({
        percent: compare.requestsPerSecondCompare,
        context: 'SLA'
      }),
    [compare.requestsPerSecondCompare]
  );

  return (
    <LoadTestResultCompareChartView
      title={title}
      value={compare.currentRequestsPerSecond}
      percent={compare.requestsPerSecondCompare}
      maxValue={compare.scenarioRequestsPerSecond}
      loading={loading.getLoadTestResultScenarioCompare}
    />
  );
};

const getState = (state: ReduxState) => ({
  compare: state.loadTestResults.loadTestResultScenarioCompare
});
export default connect(getState)(LoadTestResultScenarioCompareView);
