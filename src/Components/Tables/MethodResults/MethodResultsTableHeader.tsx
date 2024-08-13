import { BaseTableHeader } from '../BaseTableHeader';

export const MethodResultsTableHeader = () => {
  return (
    <BaseTableHeader
      cells={[
        { value: undefined },
        { value: 'Method' },
        { value: 'Max response time (ms)' },
        { value: 'Min response time (ms)' },
        { value: 'Number of requests' },
        { value: 'Number of failures' },
        { value: 'Total response time (ms)' },
        { value: 'Requests per second' },
        { value: 'Failures per second' },
        { value: 'Average response time (ms)' }
      ]}
    />
  );
};
