import { BaseTableHeader } from '../BaseTableHeader';

export const MethodResultsCompareTableHeader = () => {
  return (
    <BaseTableHeader
      cells={[
        { value: 'Method' },
        { value: 'Metric' },
        { value: 'Actual' },
        { value: 'Expected' },
        { value: 'Compare (%)' }
      ]}
    />
  );
};
