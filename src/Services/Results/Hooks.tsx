import { useSelector } from 'react-redux';
import { ReduxState } from '../../Redux/ReduxState';
import { useEffect } from 'react';
import LoadTestsResultsKibanaMenu from '../../Components/Menus/Results/LoadTestsResults/LoadTestsResultsKibanaMenu';
import LoadTestsResultsGrafanaMenu from '../../Components/Menus/Results/LoadTestsResults/LoadTestsResultsGrafanaMenu';
import { LoadTestsResultsTriggersMenu } from '../../Components/Menus/Results/LoadTestsResults/LoadTestsResultsTriggersMenu';
import { AppRoutes } from '../Constants/Routing';
import { useAppNavigation } from '../Navigation/Hooks';
import { useServicesNavigation } from '../Services/Hooks';
import { buildLoadTestResultURL, buildResultsURL } from './Utils';
import { formatRouteTemplate } from '../Navigation/Utils';
import { useIntegrations } from '../../Providers/Integrations/IntegrationsProvider';

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
  const { getIntegrations } = useIntegrations();
  const service = useSelector((state: ReduxState) => state.services.service);
  const details = useSelector((state: ReduxState) => state.loadTestResults.loadTestResultDetails);

  useEffect(() => {
    service.id && getIntegrations({ serviceId: service.id });
  }, [service.id]);

  return [
    { content: <LoadTestsResultsKibanaMenu loadTestResultId={details.id} /> },
    { content: <LoadTestsResultsGrafanaMenu loadTestResultId={details.id} /> },
    { content: <LoadTestsResultsTriggersMenu details={details} /> }
  ];
};
