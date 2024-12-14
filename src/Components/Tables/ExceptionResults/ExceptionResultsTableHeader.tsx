import { BaseTableHeader } from '../BaseTableHeader';

export const ExceptionResultsTableHeader = () => {
  return <BaseTableHeader cells={[{ value: 'Number of exceptions' }, { value: 'Message' }, { value: undefined }]} />;
};
