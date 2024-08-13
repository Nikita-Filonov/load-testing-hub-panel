export interface GetResultsAnalyticsQuery extends Record<string, string | null> {
  service: string;
  scenario: string | null;
  startDatetime: string;
  endDatetime: string;
}
