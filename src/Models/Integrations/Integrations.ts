export interface GetIntegrationURLQuery extends Record<string, string> {
  service: string;
  startedAt: string;
  finishedAt: string;
}
