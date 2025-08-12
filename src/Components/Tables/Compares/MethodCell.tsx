import { FC } from 'react';
import { BaseTableCell } from '../BaseTableCell';
import { CompareLabel } from '../../Labels/Compares/CompareLabel';
import { MethodResultCompare } from '../../../Models/Compares/Compares';
import { getMethodLabel } from '../../../Services/Methods/Utils';

type MethodCellProps = {
  compare: MethodResultCompare;
};

export const MethodCell: FC<MethodCellProps> = (props) => {
  const { compare } = props;

  return <BaseTableCell text={getMethodLabel(compare)} icon={<CompareLabel sx={{ ml: 1.5 }} compare={compare} />} />;
};
