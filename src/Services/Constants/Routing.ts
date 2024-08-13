export enum AppRoutes {
  NotFound = '*',

  Home = '/home',
  Methods = '/methods',
  MethodsDetails = '/methods/details',
  Results = '/results',
  ResultDetails = '/results/:loadTestResultId',
  ResultCompareWithScenario = '/results/:loadTestResultId/compare-with-scenario',
  ResultCompareWithActualData = '/results/:loadTestResultId/compare-with-actual-data',
  Dashboard = '/dashboard',
  Scenarios = '/scenarios'
}
