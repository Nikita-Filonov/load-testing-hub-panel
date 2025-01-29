import { AppRoutes } from '../Navigation/Routing';
import { useAppNavigation } from '../Navigation/Hooks';
import { useServicesNavigation } from '../Services/Hooks';
import { buildLoadTestResultURL, buildResultsURL } from './Utils';
import { formatRouteTemplate } from '../Navigation/Utils';

export const useLoadTestResultsNavigation = () => {
  const { onNavigate } = useAppNavigation();
  const { serviceId } = useServicesNavigation();

  const getResultsURL = (serviceId: number) => buildResultsURL(serviceId);

  const getLoadTestResultDetailsURL = (loadTestResultId: number) => buildLoadTestResultURL(loadTestResultId, serviceId);

  const getLoadTestResultDetailsRoute = (loadTestResultId: number): string => {
    return formatRouteTemplate(AppRoutes.ServiceResultDetails, { serviceId, loadTestResultId });
  };

  const navigateResults = (serviceId: number) => {
    onNavigate(AppRoutes.ServiceResults, { serviceId });
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
    getLoadTestResultDetailsURL,
    getLoadTestResultDetailsRoute,
    navigateResults,
    navigateResultDetails,
    navigateCompareWithResults,
    navigateCompareWithAverages,
    navigateCompareWithScenario
  };
};
