import { WidgetView } from '../../../Components/Views/WidgetView';
import { connect } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { MethodResultScenarioCompare } from '../../../Models/Results/MethodResults';
import { FC, useEffect } from 'react';
import { useMethodResults } from '../../../Providers/Results/MethodResultsProvider';
import { LoadTestResultDetails } from '../../../Models/Results/LoadTestResults';
import { MethodResultScenarioCompareView } from './MethodResultScenarioCompareView';
import { Grid } from '@mui/material';

type MethodResultsScenarioComparesViewProps = {
  compares: MethodResultScenarioCompare[];
  loadTestResultId: number;
  loadTestResultDetails: LoadTestResultDetails;
};

const MethodResultsScenarioComparesView: FC<MethodResultsScenarioComparesViewProps> = (props) => {
  const { compares, loadTestResultId, loadTestResultDetails } = props;
  const { loading, getMethodResultsScenarioCompares } = useMethodResults();

  useEffect(() => {
    loadTestResultDetails.scenario &&
      getMethodResultsScenarioCompares({
        scenario: loadTestResultDetails.scenario,
        loadTestResultId
      });
  }, [loadTestResultDetails.scenario, loadTestResultId]);

  return (
    <WidgetView sx={{ mt: 3 }} title={'Methods compares'} loading={loading.getMethodResultsScenarioCompares}>
      <Grid sx={{ pt: 2 }} container spacing={3}>
        {compares.map((compare, index) => (
          <Grid key={index} item xs={4}>
            <MethodResultScenarioCompareView key={index} compare={compare} />
          </Grid>
        ))}
      </Grid>
    </WidgetView>
  );
};

const getState = (state: ReduxState) => ({
  compares: state.methodResults.methodResultScenarioCompares,
  loadTestResultDetails: state.loadTestResults.loadTestResultDetails
});
export default connect(getState)(MethodResultsScenarioComparesView);
