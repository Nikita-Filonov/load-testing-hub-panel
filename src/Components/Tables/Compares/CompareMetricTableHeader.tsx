import { BaseTableHeader } from '../BaseTableHeader';

export const CompareMetricTableHeader = () => {
  return (
    <BaseTableHeader
      cells={[{ value: 'Metric' }, { value: 'Actual' }, { value: 'Expected' }, { value: 'Compare (%)' }]}
    />
  );
};
