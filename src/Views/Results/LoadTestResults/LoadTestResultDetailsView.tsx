import { WidgetView } from '../../../Components/Views/WidgetView';
import { WidgetInfoRowsView } from '../../../Components/Views/WidgetInfoRowsView';
import { useLoadTestResults } from '../../../Providers/Results/LoadTestResultsProvider';
import { FC, useEffect } from 'react';
import { BaseInfoRowView } from '../../../Components/Views/BaseInfoRowView';
import { connect } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { LoadTestResultDetails } from '../../../Models/Results/LoadTestResults';
import {
  getLoadTestResultDates,
  getLoadTestResultDuration,
  getLoadTestResultTitle
} from '../../../Services/Results/Utils';
import { LoadTestResultLabelsView } from '../../../Components/Labels/Results/LoadTestResults/LoadTestResultLabelsView';
import { Scenario } from '../../../Models/Services/Scenarios';
import { MetricName } from '../../../Services/Constants/Metrics';

type LoadTestResultDetailsViewProps = {
  loadTestResultId: number;
  details: LoadTestResultDetails;
  scenario: Scenario;
};

const LoadTestResultDetailsView: FC<LoadTestResultDetailsViewProps> = (props) => {
  const { loadTestResultId, details, scenario } = props;
  const { loading, getLoadTestResultDetails } = useLoadTestResults();

  useEffect(() => {
    loadTestResultId && getLoadTestResultDetails(loadTestResultId, { scenarioId: scenario.id });
  }, [loadTestResultId, scenario.id]);

  return (
    <WidgetView
      title={getLoadTestResultTitle(details)}
      sx={{ mt: 3 }}
      loading={loading.getLoadTestResultDetails}
      label={<LoadTestResultLabelsView result={details} />}>
      <WidgetInfoRowsView>
        <BaseInfoRowView name={'Time range'} value={getLoadTestResultDates(details)} />
        <BaseInfoRowView name={'Duration'} value={getLoadTestResultDuration(details)} />
        <BaseInfoRowView name={MetricName.NumberOfUsers} value={details.numberOfUsers} />
        <BaseInfoRowView name={'Total requests'} value={details.totalRequests} />
        <BaseInfoRowView name={'Total requests per second'} value={details.totalRequestsPerSecond} />
        <BaseInfoRowView name={'Total failures'} value={details.totalFailures} />
        <BaseInfoRowView name={'Total failures per second'} value={details.totalFailuresPerSecond} />
        <BaseInfoRowView name={MetricName.MaxResponseTime} value={details.maxResponseTime} />
        <BaseInfoRowView name={MetricName.MinResponseTime} value={details.minResponseTime} />
        <BaseInfoRowView name={MetricName.AverageResponseTime} value={details.averageResponseTime} />
        <BaseInfoRowView name={'Comment'} value={details.comment} />
      </WidgetInfoRowsView>
    </WidgetView>
  );
};

const getState = (state: ReduxState) => ({
  details: state.loadTestResults.loadTestResultDetails,
  scenario: state.scenarios.scenario
});
export default connect(getState)(LoadTestResultDetailsView);
