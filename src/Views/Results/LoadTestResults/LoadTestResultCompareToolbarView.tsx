import { BaseToolbarView } from '../../../Components/Toolbar/BaseToolbarView';
import { FC, useEffect } from 'react';
import { LoadTestsResultsTriggersMenu } from '../../../Components/Menus/Results/LoadTestsResults/LoadTestsResultsTriggersMenu';
import { LoadTestResultDetails } from '../../../Models/Results/LoadTestResults';
import { connect } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { LoadTestsResultsGrafanaMenu } from '../../../Components/Menus/Results/LoadTestsResults/LoadTestsResultsGrafanaMenu';
import { IntegrationsGrafanaProvider } from '../../../Providers/Integrations/IntegrationsGrafanaProvider';
import { Service } from '../../../Models/Services/Services';
import { useServices } from '../../../Providers/Services/ServicesProvider';
import { IntegrationsKibanaProvider } from '../../../Providers/Integrations/IntegrationsKibanaProvider';
import { LoadTestsResultsKibanaMenu } from '../../../Components/Menus/Results/LoadTestsResults/LoadTestsResultsKibanaMenu';

type LoadTestResultCompareToolbarViewProps = {
  title: string;
  details: LoadTestResultDetails;
  services: Service[];
};

const LoadTestResultCompareToolbarView: FC<LoadTestResultCompareToolbarViewProps> = (props) => {
  const { title, details, services } = props;
  const { getServices } = useServices();

  useEffect(() => {
    getServices();
  }, []);

  return (
    <BaseToolbarView
      title={title}
      actions={[
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
export default connect(getState)(LoadTestResultCompareToolbarView);
