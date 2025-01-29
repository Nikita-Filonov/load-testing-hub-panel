import { Grid2, useTheme } from '@mui/material';
import { FC, Fragment } from 'react';
import Typography from '@mui/material/Typography';
import UpdateIcon from '@mui/icons-material/Update';
import RestoreIcon from '@mui/icons-material/Restore';
import TimelapseIcon from '@mui/icons-material/Timelapse';

type Props = {
  min: string;
  max: string;
  middle?: string;
};

export const RangeSliderMinMaxView: FC<Props> = ({ min, max, middle }) => {
  const theme = useTheme();

  return (
    <Grid2 container spacing={0}>
      <Grid2 size={{ md: 4, sm: 4 }} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
        <Typography sx={{ mr: 0.5 }} variant={'body2'}>
          {min}
        </Typography>
        <RestoreIcon sx={{ fontSize: theme.typography.body1.fontSize }} />
      </Grid2>
      <Grid2 size={{ md: 4, sm: 4 }} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {middle && (
          <Fragment>
            <TimelapseIcon sx={{ fontSize: theme.typography.body1.fontSize }} />
            <Typography sx={{ ml: 0.5 }} variant={'body2'}>
              {middle}
            </Typography>
          </Fragment>
        )}
      </Grid2>
      <Grid2 size={{ md: 4, sm: 4 }} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        <UpdateIcon sx={{ fontSize: theme.typography.body1.fontSize }} />
        <Typography sx={{ ml: 0.5 }} variant={'body2'}>
          {max}
        </Typography>
      </Grid2>
    </Grid2>
  );
};
