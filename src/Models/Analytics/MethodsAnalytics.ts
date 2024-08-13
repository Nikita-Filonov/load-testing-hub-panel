export interface GetMethodsAnalyticsQuery extends Record<string, string | null> {
  method: string;
  scenario: string | null;
  startDatetime: string;
  endDatetime: string;
}
