import { BaseModal, BaseModalProps } from './BaseModal';
import { FC } from 'react';
import Typography from '@mui/material/Typography';

type DeleteModalProps = Omit<BaseModalProps, 'children'>;

export const DeleteModal: FC<DeleteModalProps> = (props) => {
  return (
    <BaseModal {...props}>
      <Typography>This action is irreversible and cannot be undone. Are you sure you want to proceed?</Typography>
    </BaseModal>
  );
};
