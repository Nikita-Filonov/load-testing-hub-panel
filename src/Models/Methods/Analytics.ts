export interface GetMethodDetailsAnalyticsQuery {
  method: string;
  serviceId: number;
  scenarioId: number | null;
  endDatetime: string;
  startDatetime: string;
}
