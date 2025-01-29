import * as React from 'react';
import { FC, PropsWithChildren } from 'react';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';

type Props = {
  anchor: HTMLElement | null;
  setAnchor: (anchor: HTMLElement | null) => void;
} & PropsWithChildren;

export const BasePopover: FC<Props> = ({ anchor, setAnchor, children }) => {
  const onClose = () => setAnchor(null);

  return (
    <Popover
      open={Boolean(anchor)}
      anchorEl={anchor}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      slotProps={{
        paper: {
          sx: {
            width: 900
          }
        }
      }}>
      <Box sx={{ p: 3 }}>{children}</Box>
    </Popover>
  );
};
