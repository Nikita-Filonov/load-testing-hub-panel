export const getCompareTitle = ({ percent, context }: { percent?: number; context: string }): string => {
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

export const getCompareColor = (percent?: number): 'error' | 'success' | 'warning' => {
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
