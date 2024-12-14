import { FC } from 'react';
import { BaseTableCell } from '../BaseTableCell';
import { getMethodLabel } from '../../../Services/Charts/Utils';
import { CompareLabel } from '../../Labels/Compares/CompareLabel';

type MethodCellProps = {
  method: string;
  compare: number;
};

export const MethodCell: FC<MethodCellProps> = (props) => {
  const { compare, method } = props;

  return <BaseTableCell text={getMethodLabel(method)} icon={<CompareLabel sx={{ ml: 1.5 }} compare={compare} />} />;
};
