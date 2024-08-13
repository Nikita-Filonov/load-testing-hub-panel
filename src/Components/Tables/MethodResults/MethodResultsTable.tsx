import { FC } from 'react';
import { BaseTable } from '../BaseTable';
import { MethodResultsTableHeader } from './MethodResultsTableHeader';
import { MethodResultsTableRow } from './MethodResultsTableRow';
import { MethodResult } from '../../../Models/Results/MethodResults';

type MethodResultsTableProps = {
  results: MethodResult[];
  loading: boolean;
};

export const MethodResultsTable: FC<MethodResultsTableProps> = ({ results, loading }) => {
  return (
    <BaseTable loading={loading} containerSx={{ mt: 3 }} header={<MethodResultsTableHeader />}>
      {results.map((result, index) => (
        <MethodResultsTableRow key={index} result={result} />
      ))}
    </BaseTable>
  );
};
