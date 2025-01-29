import { FC } from 'react';
import { CompareExplanationsTableHeader } from './CompareExplanationsTableHeader';
import { CompareExplanationsTableRow } from './CompareExplanationsTableRow';
import { CompareExplanation } from '../../../Models/Compares/CompareExplanation';
import { Table, TableBody } from '@mui/material';

type CompareExplanationsTableProps = {
  explanations: CompareExplanation[];
};

export const CompareExplanationsTable: FC<CompareExplanationsTableProps> = (props) => {
  const { explanations } = props;

  return (
    <Table size={'small'}>
      <CompareExplanationsTableHeader />
      <TableBody>
        {explanations.map((explanation, index) => (
          <CompareExplanationsTableRow key={index} explanation={explanation} />
        ))}
      </TableBody>
    </Table>
  );
};
