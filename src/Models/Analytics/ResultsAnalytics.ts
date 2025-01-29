export interface GetResultsAnalyticsQuery {
  serviceId: number;
  scenarioId: number | null;
  endDatetime: string;
  startDatetime: string;
}
