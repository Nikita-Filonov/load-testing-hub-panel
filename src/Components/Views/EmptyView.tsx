import { Box, SxProps, Theme, Typography } from '@mui/material';
import { FC, ReactNode } from 'react';
import { SettingsManager } from '../../Services/Config';
import { BaseImage } from '../Images/BaseImage';

type EmptyViewProps = {
  title: string;
  description: string | ReactNode;
  containerSx?: SxProps<Theme>;
};

export const EmptyView: FC<EmptyViewProps> = ({ title, description, containerSx }) => {
  return (
    <Box
      sx={{
        flexDirection: 'column',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...containerSx
      }}>
      <BaseImage src={SettingsManager.getStaticFileUrl('inbox.png')} width={150} height={150} />
      <Typography sx={{ mt: 2 }} variant={'h6'}>
        {title}
      </Typography>
      <Typography>{description}</Typography>
    </Box>
  );
};
