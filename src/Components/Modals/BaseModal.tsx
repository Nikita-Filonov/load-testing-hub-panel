import {
  Badge,
  Box,
  Breakpoint,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  SxProps,
  Theme
} from '@mui/material';
import { FC, ReactNode } from 'react';
import { LoadingButton } from '@mui/lab';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { LoadingView } from '../Views/LoadingView';

type ModalAction = {
  icon?: ReactNode;
  onClick?: () => void;
  badgeContent?: ReactNode;
};

export type BaseModalProps = {
  children: ReactNode;
  title: string;
  modal: boolean;
  setModal: (modal: boolean) => void;
  maxWidth?: Breakpoint;
  actions?: ModalAction[];
  onCancel?: () => void;
  onConfirm?: () => void;
  loading?: boolean;
  contentSx?: SxProps<Theme>;
  confirmLoading?: boolean;
  confirmDisabled?: boolean;
};

export const BaseModal: FC<BaseModalProps> = (props) => {
  const {
    children,
    title,
    modal,
    setModal,
    actions,
    maxWidth,
    onCancel,
    onConfirm,
    loading,
    contentSx,
    confirmLoading,
    confirmDisabled
  } = props;

  const onClose = () => (onCancel ? onCancel() : setModal(false));

  return (
    <Dialog open={modal} onClose={onClose} scroll={'paper'} fullWidth maxWidth={maxWidth}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <DialogTitle>{title}</DialogTitle>
        <Box sx={{ flexGrow: 1 }} />
        {actions?.map((action, index) => (
          <IconButton size={'small'} key={index} sx={{ mr: 2 }} onClick={action.onClick}>
            <Badge badgeContent={action.badgeContent} color="primary">
              {action.icon}
            </Badge>
          </IconButton>
        ))}
        <IconButton sx={{ mr: 2 }} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent dividers={true} sx={contentSx}>
        {loading ? <LoadingView height={300} /> : children}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        {onConfirm && (
          <LoadingButton loading={confirmLoading} disabled={confirmDisabled} onClick={onConfirm}>
            Confirm
          </LoadingButton>
        )}
      </DialogActions>
    </Dialog>
  );
};
