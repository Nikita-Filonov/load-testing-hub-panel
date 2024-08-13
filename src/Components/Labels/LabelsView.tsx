import { Grid } from '@mui/material';
import { Children, FC, PropsWithChildren } from 'react';

export const LabelsView: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Grid container spacing={1} display={'flex'} justifyContent={'flex-end'}>
      {Children.map(
        children,
        (child, index) =>
          child && (
            <Grid key={index} item>
              {child}
            </Grid>
          )
      )}
    </Grid>
  );
};
