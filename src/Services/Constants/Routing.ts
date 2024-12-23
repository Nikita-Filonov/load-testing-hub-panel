export enum AppRoutes {
  Root = '/',
  NotFound = '*',

  // Services
  Services = '/services',
  ServiceDetails = '/services/:serviceId',

  // Service results
  ServiceResults = '/services/:serviceId/results',
  ServiceResultDetails = '/services/:serviceId/results/:loadTestResultId',
  ServiceCompareResultWithResults = '/services/:serviceId/results/:loadTestResultId/compare-result-with-results',
  ServiceCompareResultWithAverages = '/services/:serviceId/results/:loadTestResultId/compare-result-with-averages',
  ServiceCompareResultWithScenario = '/services/:serviceId/results/:loadTestResultId/compare-result-with-scenario',

  // Service methods
  ServiceMethods = '/services/:serviceId/methods',
  ServiceMethodDetails = '/services/:serviceId/methods/details',

  // Service dashboard
  ServiceDashboard = '/services/:serviceId/dashboard',

  // Service scenarios
  ServiceScenarios = '/services/:serviceId/scenarios',

  // Service compares
  ServiceSettings = '/services/:serviceId/settings',
  ServiceSettingsGeneral = '/services/:serviceId/settings/general',
  ServiceSettingsCompareWeights = '/services/:serviceId/settings/compare-weights',
  ServiceSettingsCompareHighlightThreshold = '/services/:serviceId/settings/compare-highlight-threshold'
}
