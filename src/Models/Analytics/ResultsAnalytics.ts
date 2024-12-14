export interface GetResultsAnalyticsQuery {
  serviceId: number;
  scenarioId: number | null;
  startDatetime: string;
  endDatetime: string;
}
