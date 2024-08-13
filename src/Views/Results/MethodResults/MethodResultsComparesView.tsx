import { WidgetView } from '../../../Components/Views/WidgetView';
import { connect } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { MethodResultCompare } from '../../../Models/Results/MethodResults';
import { FC, useEffect } from 'react';
import { MethodResultCompareView } from './MethodResultCompareView';
import { useMethodResults } from '../../../Providers/Results/MethodResultsProvider';
import { Service } from '../../../Models/Services/Services';
import { Scenario } from '../../../Models/Services/Scenarios';
import { Grid } from '@mui/material';

type MethodResultsComparesViewProps = {
  service: Service;
  scenario: Scenario;
  compares: MethodResultCompare[];
  loadTestResultId: number;
};

const MethodResultsComparesView: FC<MethodResultsComparesViewProps> = (props) => {
  const { service, scenario, compares, loadTestResultId } = props;
  const { loading, getMethodResultsCompares } = useMethodResults();

  useEffect(() => {
    service.name &&
      getMethodResultsCompares({
        service: service.name,
        scenario: scenario.name,
        loadTestResultId
      });
  }, [service.name, scenario.name, loadTestResultId]);

  return (
    <WidgetView sx={{ mt: 3 }} title={'Methods compares'} loading={loading.getMethodResultsCompares}>
      <Grid sx={{ pt: 2 }} container spacing={3}>
        {compares.map((compare, index) => (
          <Grid key={index} item xs={6}>
            <MethodResultCompareView compare={compare} />
          </Grid>
        ))}
      </Grid>
    </WidgetView>
  );
};

const getState = (state: ReduxState) => ({
  service: state.services.service,
  scenario: state.scenarios.scenario,
  compares: state.methodResults.methodResultsCompares
});
export default connect(getState)(MethodResultsComparesView);
