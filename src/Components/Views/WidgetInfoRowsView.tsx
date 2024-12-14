import { Grid2, SxProps, Theme } from '@mui/material';
import { Children, FC, ReactNode } from 'react';

type WidgetInfoRowsViewProps = {
  children: ReactNode[] | ReactNode;
  containerSx?: SxProps<Theme>;
};

export const WidgetInfoRowsView: FC<WidgetInfoRowsViewProps> = (props) => {
  const { children, containerSx } = props;

  return (
    <Grid2 container spacing={2} sx={{ mt: 2, ...containerSx }}>
      {Children.map(
        children,
        (child, index) =>
          child && (
            <Grid2 key={index} size={{ xs: 12 }}>
              {child}
            </Grid2>
          )
      )}
    </Grid2>
  );
};
