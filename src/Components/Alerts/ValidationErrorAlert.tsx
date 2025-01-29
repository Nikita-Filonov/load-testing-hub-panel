import { FC } from 'react';
import { Alert } from '@mui/material';
import { ValidationError } from '../../Services/Clients/Models';

type Props = {
  error: ValidationError;
};

export const ValidationErrorAlert: FC<Props> = ({ error }) => {
  return (
    <Alert severity="error" variant="outlined">
      {error.msg}
    </Alert>
  );
};
