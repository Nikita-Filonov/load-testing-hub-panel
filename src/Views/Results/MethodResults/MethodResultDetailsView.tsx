import { FC, useEffect } from 'react';
import { useMethodResults } from '../../../Providers/Results/MethodResultsProvider';
import { connect, useDispatch } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { MethodResultDetails } from '../../../Models/Results/MethodResults';
import { BaseMethodResultDetailsView } from './BaseMethodResultDetailsView';
import { Scenario } from '../../../Models/Services/Scenarios';
import { MethodResultDetailsLabelsView } from '../../../Components/Labels/Results/MethodResults/MethodResultDetailsLabelsView';
import { setMethodResultDetails } from '../../../Redux/Results/MethodResults/Slice';
import { INITIAL_METHOD_RESULTS } from '../../../Redux/Results/MethodResults/InitialState';
import { WidgetView } from '../../../Components/Views/WidgetView';
import WebhookIcon from '@mui/icons-material/Webhook';
import { useMethodsNavigation } from '../../../Services/Methods/Hooks';
import { getMethodLabel } from '../../../Services/Methods/Utils';

type MethodResultViewProps = {
  details: MethodResultDetails;
  scenario: Scenario;
  methodResultId: number;
};

const MethodResultDetailsView: FC<MethodResultViewProps> = ({ details, scenario, methodResultId }) => {
  const dispatch = useDispatch();
  const { loading, getMethodResultDetails } = useMethodResults();
  const { navigateMethodDetails } = useMethodsNavigation();

  useEffect(() => {
    if (methodResultId) {
      getMethodResultDetails(methodResultId, { scenarioId: scenario.id });
    }

    return () => {
      dispatch(setMethodResultDetails(INITIAL_METHOD_RESULTS.methodResultDetails));
    };
  }, [methodResultId, scenario.id]);

  const onMethodAnalytics = () => navigateMethodDetails(details.method);

  return (
    <WidgetView
      title={`Values for ${getMethodLabel(details.method)} method`}
      label={<MethodResultDetailsLabelsView details={details} />}
      loading={loading.getMethodResultDetails}
      actions={[{ icon: <WebhookIcon fontSize={'small'} />, onClick: onMethodAnalytics }]}>
      <BaseMethodResultDetailsView details={details} />
    </WidgetView>
  );
};

const getState = (state: ReduxState) => ({
  details: state.methodResults.methodResultDetails,
  scenario: state.scenarios.scenario
});
export default connect(getState)(MethodResultDetailsView);
