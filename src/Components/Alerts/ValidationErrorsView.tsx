import { Grid } from '@mui/material';
import { ValidationError } from '../../Services/Clients/Models';
import { FC } from 'react';
import { ValidationErrorAlert } from './ValidationErrorAlert';

type Props = {
  errors?: ValidationError[];
};

export const ValidationErrorsView: FC<Props> = ({ errors }) => {
  return (
    <Grid spacing={2} container>
      {errors?.map((error, index) => (
        <Grid key={index} size={{ md: 12, xs: 12 }}>
          <ValidationErrorAlert error={error} />
        </Grid>
      ))}
    </Grid>
  );
};
