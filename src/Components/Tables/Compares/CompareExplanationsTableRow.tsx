import { BaseTableRow } from '../BaseTableRow';
import { FC } from 'react';
import { CompareExplanation } from '../../../Models/Compares/CompareExplanation';

type CompareExplanationsTableRowProps = {
  explanation: CompareExplanation;
};

export const CompareExplanationsTableRow: FC<CompareExplanationsTableRowProps> = (props) => {
  const { explanation } = props;

  return (
    <BaseTableRow
      sx={{ borderBottom: `2px solid white` }}
      hover
      cells={[
        { sx: { pl: 0, color: 'white' }, value: explanation.metric },
        { sx: { color: 'white' }, value: `${explanation.compare}%` },
        { sx: { color: 'white' }, value: explanation.weight }
      ]}
    />
  );
};
