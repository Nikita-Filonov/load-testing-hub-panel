import { FC } from 'react';
import { CompareIcons } from '../../Icons/Compares/CompareIcons';
import { BaseTableCell } from '../BaseTableCell';

type CompareCellProps = {
  compare: number;
};

export const CompareCell: FC<CompareCellProps> = (props) => {
  const { compare } = props;

  return <BaseTableCell text={`${compare}%`} icon={<CompareIcons compare={compare} />} />;
};
