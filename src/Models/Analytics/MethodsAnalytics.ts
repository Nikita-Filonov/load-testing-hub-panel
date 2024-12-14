export interface GetMethodsAnalyticsQuery {
  method: string;
  serviceId: number;
  scenarioId: number | null;
  startDatetime: string;
  endDatetime: string;
}
