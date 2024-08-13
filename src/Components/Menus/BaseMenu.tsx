import { LoadingButton } from '@mui/lab';
import { IconButton, SxProps, Theme } from '@mui/material';
import Menu from '@mui/material/Menu';
import React, { FC } from 'react';

type BaseMenuProps = {
  children: React.ReactNode;
  icon?: React.ReactNode;
  buttonLabel?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  buttonSx?: SxProps<Theme>;
  menu: null | HTMLElement;
  setMenu: (menu: null | HTMLElement) => void;
};

export const BaseMenu: FC<BaseMenuProps> = (props) => {
  const { children, icon, buttonLabel, buttonSx, startIcon, endIcon, loading, disabled, menu, setMenu } = props;

  const onOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenu(event.currentTarget);
  };

  const onClose = () => setMenu(null);

  return (
    <React.Fragment>
      {icon ? (
        <IconButton onClick={onOpen} sx={buttonSx} disabled={disabled}>
          {icon}
        </IconButton>
      ) : (
        <LoadingButton
          loading={loading}
          variant={'outlined'}
          sx={buttonSx}
          onClick={onOpen}
          disabled={disabled}
          startIcon={startIcon}
          endIcon={endIcon}>
          {buttonLabel}
        </LoadingButton>
      )}
      <Menu anchorEl={menu} open={Boolean(menu)} onClose={onClose} disableScrollLock={true}>
        {children}
      </Menu>
    </React.Fragment>
  );
};
