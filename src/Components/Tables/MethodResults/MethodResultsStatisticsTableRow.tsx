import { BaseTableRow } from '../BaseTableRow';
import { FC } from 'react';
import { MethodResult } from '../../../Models/Results/MethodResults';
import { MethodResultDetailsButton } from '../../Buttons/Results/MethodResults/MethodResultDetailsButton';
import { RowSettings } from '../../../Models/Core/TableSettings';

type MethodResultsStatisticsTableRowProps = {
  rows: RowSettings<MethodResult>[];
  result: MethodResult;
  onMethodResultDetails: (result: MethodResult) => void;
};

export const MethodResultsStatisticsTableRow: FC<MethodResultsStatisticsTableRowProps> = (props) => {
  const { rows, result, onMethodResultDetails } = props;

  const onDetails = () => onMethodResultDetails(result);

  return (
    <BaseTableRow
      hover
      cells={[
        { value: <MethodResultDetailsButton onDetails={onDetails} /> },
        ...rows.map((row) => ({ ...row, value: result[row.value] }))
      ]}
    />
  );
};
