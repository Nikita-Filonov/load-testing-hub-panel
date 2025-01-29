import { MetricName } from '../Metrics/Base';

export interface CompareExplanation {
  metric: MetricName;
  weight: number;
  compare: number;
}

export interface CompareExplanationSummary {
  formula: string;
  explanations: CompareExplanation[];
}
