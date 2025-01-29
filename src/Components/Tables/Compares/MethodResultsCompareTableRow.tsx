import { BaseTableRow, TableRowCell } from '../BaseTableRow';
import { FC } from 'react';
import { MethodResultCompare } from '../../../Models/Compares/Compares';
import { MethodCell } from './MethodCell';
import { MethodResultDetailsButton } from '../../Buttons/Results/MethodResults/MethodResultDetailsButton';

type MethodResultsCompareTableRowProps = {
  compare: MethodResultCompare;
  numberOfRows: number;
  onCompareMethodResultsHistory?: (compare: MethodResultCompare) => void;
};

export const MethodResultsCompareTableRow: FC<MethodResultsCompareTableRowProps> = (props) => {
  const { compare, numberOfRows, onCompareMethodResultsHistory } = props;

  const cells: TableRowCell[] = [{ value: <MethodCell compare={compare} />, rowSpan: numberOfRows + 1 }];

  const onHistory = () => onCompareMethodResultsHistory && onCompareMethodResultsHistory(compare);

  if (onCompareMethodResultsHistory) {
    cells.unshift({
      value: <MethodResultDetailsButton onDetails={onHistory} />,
      rowSpan: numberOfRows + 1
    });
  }

  return <BaseTableRow cells={cells} />;
};
