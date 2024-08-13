export interface RatioResult {
  id: string;
  name: string;
  ratio: number;
  tasks: RatioResult[];
}

export interface GetRatioResultResponse {
  ratioTotal: RatioResult[];
  ratioPerClass: RatioResult[];
}
