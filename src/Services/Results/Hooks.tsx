import { useServices } from '../../Providers/Services/ServicesProvider';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../Redux/ReduxState';
import { useEffect } from 'react';
import { IntegrationsKibanaProvider } from '../../Providers/Integrations/IntegrationsKibanaProvider';
import { LoadTestsResultsKibanaMenu } from '../../Components/Menus/Results/LoadTestsResults/LoadTestsResultsKibanaMenu';
import { IntegrationsGrafanaProvider } from '../../Providers/Integrations/IntegrationsGrafanaProvider';
import { LoadTestsResultsGrafanaMenu } from '../../Components/Menus/Results/LoadTestsResults/LoadTestsResultsGrafanaMenu';
import { LoadTestsResultsTriggersMenu } from '../../Components/Menus/Results/LoadTestsResults/LoadTestsResultsTriggersMenu';
import { AppRoutes } from '../Constants/Routing';
import { useAppNavigation } from '../Navigation/Hooks';
import { useServicesNavigation } from '../Services/Hooks';
import { buildLoadTestResultURL, buildResultsURL } from './Utils';
import { formatRouteTemplate } from '../Navigation/Utils';
import { ServiceType } from '../../Models/Services/Services';

export const useLoadTestResultsNavigation = () => {
  const { onNavigate } = useAppNavigation();
  const { serviceId } = useServicesNavigation();

  const getResultsURL = (serviceId: number) => buildResultsURL(serviceId);

  const getResultsRoute = (serviceId: number) => formatRouteTemplate(AppRoutes.ServiceResults, { serviceId });

  const getLoadTestResultDetailsURL = (loadTestResultId: number) => buildLoadTestResultURL(loadTestResultId, serviceId);

  const getLoadTestResultDetailsRoute = (loadTestResultId: number): string => {
    return formatRouteTemplate(AppRoutes.ServiceResultDetails, { serviceId, loadTestResultId });
  };

  const navigateResultDetails = (loadTestResultId: number) => {
    onNavigate(AppRoutes.ServiceResultDetails, { serviceId, loadTestResultId });
  };

  const navigateCompareWithResults = (loadTestResultId: number) => {
    onNavigate(AppRoutes.ServiceCompareResultWithResults, { serviceId, loadTestResultId });
  };

  const navigateCompareWithAverages = (loadTestResultId: number) => {
    onNavigate(AppRoutes.ServiceCompareResultWithAverages, { serviceId, loadTestResultId });
  };

  const navigateCompareWithScenario = (loadTestResultId: number) => {
    onNavigate(AppRoutes.ServiceCompareResultWithScenario, { serviceId, loadTestResultId });
  };

  return {
    getResultsURL,
    getResultsRoute,
    getLoadTestResultDetailsURL,
    getLoadTestResultDetailsRoute,
    navigateResultDetails,
    navigateCompareWithResults,
    navigateCompareWithAverages,
    navigateCompareWithScenario
  };
};

export const useLoadTestResultDetailsToolbarActions = () => {
  const { getServices } = useServices();
  const details = useSelector((state: ReduxState) => state.loadTestResults.loadTestResultDetails);
  const services = useSelector((state: ReduxState) => state.services.services);

  useEffect(() => {
    getServices({ types: [ServiceType.Internal, ServiceType.Production] });
  }, []);

  return [
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
  ];
};
