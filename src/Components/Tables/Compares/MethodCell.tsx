import { FC } from 'react';
import { BaseTableCell } from '../BaseTableCell';
import { getMethodLabel } from '../../../Services/Charts/Utils';
import { CompareLabel } from '../../Labels/Compares/CompareLabel';
import { MethodResultCompare } from '../../../Models/Compares/Compares';

type MethodCellProps = {
  compare: MethodResultCompare;
};

export const MethodCell: FC<MethodCellProps> = (props) => {
  const { compare } = props;

  return (
    <BaseTableCell text={getMethodLabel(compare.method)} icon={<CompareLabel sx={{ ml: 1.5 }} compare={compare} />} />
  );
};
