import { LoadTestResult, ShortLoadTestResult } from '../../Models/Results/LoadTestResults';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { SettingsManager } from '../Config';
import { AppRoutes } from '../Navigation/Routing';
import { formatRouteTemplate } from '../Navigation/Utils';
import { LoadTestResultsFilters } from '../../Components/Modals/Results/LoadTestsResults/LoadTestResultsFiltersModal';

dayjs.extend(duration);

export const getLoadTestResultTitle = (result: ShortLoadTestResult): string => {
  return `#${result.id} Load tests for ${result.service.name}, ${result.scenario.name} scenario`;
};

export const getLoadTestResultDates = (result: LoadTestResult): string => {
  const startedAt = dayjs(result.startedAt).format(SettingsManager.apiDateTimeFormat);
  const finishedAt = dayjs(result.finishedAt).format(SettingsManager.apiDateTimeFormat);

  return `${startedAt} — ${finishedAt}`;
};

export const getLoadTestResultDuration = (result: LoadTestResult): string => {
  const duration = dayjs.duration(result.duration, 'seconds');
  return duration.format(SettingsManager.durationFormat);
};

export const buildResultsURL = (serviceId: number): string => {
  const route = formatRouteTemplate(AppRoutes.ServiceResults, { serviceId });

  return `${SettingsManager.appUrl}${route}`;
};

export const buildLoadTestResultURL = (loadTestResultId: number, serviceId: number): string => {
  const route = formatRouteTemplate(AppRoutes.ServiceResultDetails, { serviceId, loadTestResultId });

  return `${SettingsManager.appUrl}${route}`;
};

export const getDefaultLoadTestResultsFilters = (): LoadTestResultsFilters => {
  return {
    startedAt: null,
    finishedAt: null,
    triggerCIProjectVersion: null
  };
};
