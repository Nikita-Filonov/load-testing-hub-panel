import { Grid2 } from '@mui/material';
import { ValidationError } from '../../Services/Clients/Models';
import { FC } from 'react';
import { ValidationErrorAlert } from './ValidationErrorAlert';

type Props = {
  errors?: ValidationError[];
};

export const ValidationErrorsView: FC<Props> = ({ errors }) => {
  return (
    <Grid2 spacing={2} container>
      {errors?.map((error, index) => (
        <Grid2 key={index} size={{ md: 12, xs: 12 }}>
          <ValidationErrorAlert error={error} />
        </Grid2>
      ))}
    </Grid2>
  );
};
