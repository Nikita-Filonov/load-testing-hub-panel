import { BaseToolbarView } from '../../../Components/Toolbar/BaseToolbarView';
import { FC, useEffect } from 'react';
import { LoadTestsResultsTriggersMenu } from '../../../Components/Menus/Results/LoadTestsResults/LoadTestsResultsTriggersMenu';
import { LoadTestResultDetails } from '../../../Models/Results/LoadTestResults';
import { connect } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { LoadTestsResultsGrafanaMenu } from '../../../Components/Menus/Results/LoadTestsResults/LoadTestsResultsGrafanaMenu';
import { useServices } from '../../../Providers/Services/ServicesProvider';
import { IntegrationsGrafanaProvider } from '../../../Providers/Integrations/IntegrationsGrafanaProvider';
import { LoadTestsResultsCompareMenu } from '../../../Components/Menus/Results/LoadTestsResults/LoadTestsResultsCompareMenu';
import { Service } from '../../../Models/Services/Services';
import { LoadTestsResultsKibanaMenu } from '../../../Components/Menus/Results/LoadTestsResults/LoadTestsResultsKibanaMenu';
import { IntegrationsKibanaProvider } from '../../../Providers/Integrations/IntegrationsKibanaProvider';

type LoadTestResultDetailsToolbarViewProps = {
  details: LoadTestResultDetails;
  services: Service[];
};

const LoadTestResultDetailsToolbarView: FC<LoadTestResultDetailsToolbarViewProps> = (props) => {
  const { details, services } = props;
  const { getServices } = useServices();

  useEffect(() => {
    getServices();
  }, []);

  return (
    <BaseToolbarView
      title={'Load tests result details'}
      actions={[
        { content: <LoadTestsResultsCompareMenu loadTestResultId={details.id} /> },
        {
          content: (
            <IntegrationsKibanaProvider>
              <LoadTestsResultsKibanaMenu details={details} services={services} />
            </IntegrationsKibanaProvider>
          )
        },
        {
          content: (
            <IntegrationsGrafanaProvider>
              <LoadTestsResultsGrafanaMenu details={details} services={services} />
            </IntegrationsGrafanaProvider>
          )
        },
        { content: <LoadTestsResultsTriggersMenu details={details} /> }
      ]}
    />
  );
};

const getState = (state: ReduxState) => ({
  details: state.loadTestResults.loadTestResultDetails,
  services: state.services.services
});
export default connect(getState)(LoadTestResultDetailsToolbarView);
