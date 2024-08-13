import Typography from '@mui/material/Typography';
import { LoadingView } from './LoadingView';
import Box from '@mui/material/Box';
import { FC, PropsWithChildren } from 'react';
import { SxProps, Theme } from '@mui/material';

type BoxViewProps = {
  titleSx?: SxProps<Theme>;
  title: string;
  loading?: boolean;
} & PropsWithChildren;

export const BoxView: FC<BoxViewProps> = ({ titleSx, title, loading, children }) => {
  return (
    <Box>
      <Typography sx={{ mt: 3, ...titleSx }} fontWeight={'bold'}>
        {title}
      </Typography>
      {loading ? <LoadingView height={200} /> : children}
    </Box>
  );
};
