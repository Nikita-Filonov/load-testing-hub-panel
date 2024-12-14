import { FC } from 'react';
import { BaseTable } from '../BaseTable';
import { ExceptionResultsTableHeader } from './ExceptionResultsTableHeader';
import { ExceptionResultsTableRow } from './ExceptionResultsTableRow';
import { ExceptionResult } from '../../../Models/Results/ExceptionResults';

type ExceptionResultsTableProps = {
  loading: boolean;
  results: ExceptionResult[];
  onViewDetails: (result: ExceptionResult) => void;
};

export const ExceptionResultsTable: FC<ExceptionResultsTableProps> = (props) => {
  const { results, loading, onViewDetails } = props;

  return (
    <BaseTable loading={loading} containerSx={{ mt: 3 }} header={<ExceptionResultsTableHeader />}>
      {results.map((result, index) => (
        <ExceptionResultsTableRow key={index} result={result} onViewDetails={onViewDetails} />
      ))}
    </BaseTable>
  );
};
