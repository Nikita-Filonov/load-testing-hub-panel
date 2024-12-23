import { BaseTableRow } from '../BaseTableRow';
import { FC } from 'react';
import { MethodResultCompare } from '../../../Models/Compares/Compares';
import { MethodCell } from './MethodCell';

type MethodResultsCompareTableRowProps = {
  compare: MethodResultCompare;
  numberOfRows: number;
};

export const MethodResultsCompareTableRow: FC<MethodResultsCompareTableRowProps> = (props) => {
  const { compare, numberOfRows } = props;

  return <BaseTableRow cells={[{ value: <MethodCell compare={compare} />, rowSpan: numberOfRows + 1 }]} />;
};
