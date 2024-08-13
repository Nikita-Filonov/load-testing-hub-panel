import { Grid, SxProps, Theme } from '@mui/material';
import { Children, FC, ReactNode } from 'react';

type WidgetInfoRowsViewProps = {
  children: ReactNode[] | ReactNode;
  containerSx?: SxProps<Theme>;
};

export const WidgetInfoRowsView: FC<WidgetInfoRowsViewProps> = (props) => {
  const { children, containerSx } = props;

  return (
    <Grid container spacing={2} sx={{ mt: 2, ...containerSx }}>
      {Children.map(
        children,
        (child, index) =>
          child && (
            <Grid key={index} item xs={12}>
              {child}
            </Grid>
          )
      )}
    </Grid>
  );
};
