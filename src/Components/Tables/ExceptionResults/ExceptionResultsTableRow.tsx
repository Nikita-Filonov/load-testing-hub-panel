import { BaseTableRow } from '../BaseTableRow';
import { FC } from 'react';
import IconButton from '@mui/material/IconButton';
import { ExceptionResult } from '../../../Models/Results/ExceptionResults';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';

type ExceptionResultsTableRowProps = {
  result: ExceptionResult;
  onViewDetails: (result: ExceptionResult) => void;
};

export const ExceptionResultsTableRow: FC<ExceptionResultsTableRowProps> = (props) => {
  const { result, onViewDetails } = props;

  const onDetails = () => onViewDetails(result);

  return (
    <BaseTableRow
      hover
      cells={[
        { value: result.numberOfExceptions },
        { value: result.message },
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
