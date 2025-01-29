import { BaseTableRow } from '../BaseTableRow';
import { FC } from 'react';
import IconButton from '@mui/material/IconButton';
import { ExceptionResult } from '../../../Models/Results/ExceptionResults';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import { RowSettings } from '../../../Models/Core/TableSettings';

type ExceptionResultsTableRowProps = {
  rows: RowSettings<ExceptionResult>[];
  result: ExceptionResult;
  onViewDetails: (result: ExceptionResult) => void;
};

export const ExceptionResultsTableRow: FC<ExceptionResultsTableRowProps> = (props) => {
  const { rows, result, onViewDetails } = props;

  const onDetails = () => onViewDetails(result);

  return (
    <BaseTableRow
      hover
      cells={[
        ...rows.map((row) => ({ ...row, value: result[row.value] })),
        {
          align: 'right',
          value: (
            <IconButton onClick={onDetails}>
              <ArticleOutlinedIcon />
            </IconButton>
          )
        }
      ]}
    />
  );
};
