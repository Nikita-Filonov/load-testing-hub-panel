import { LoadTestResult } from '../../Models/Results/LoadTestResults';

export const getLoadTestResultTitle = (result: LoadTestResult): string => {
  if (result.triggerCIProjectVersion) {
    return `Load tests for ${result.service} ${result.triggerCIProjectVersion}`;
  }

  return `Load tests for ${result.service}`;
};

export const getLoadTestResultCompareTitle = ({ percent, context }: { percent?: number; context: string }): string => {
  if (percent === undefined) {
    return 'No info';
  }

  if (percent > 0) {
    return `${percent}% better than ${context}`;
  }

  if (percent < 0) {
    return `${percent}% worse than ${context}`;
  }

  return `No difference to ${context}`;
};

export const getLoadTestResultCompareColor = (percent?: number): 'error' | 'success' | 'warning' => {
  if (percent === undefined) {
    return 'warning';
  }

  if (percent > 0) {
    return 'success';
  }

  if (percent < 0) {
    return 'error';
  }

  return 'warning';
};
