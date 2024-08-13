import { FC } from 'react';
import { BaseModal, BaseModalProps } from './BaseModal';
import { Button } from '@mui/material';

type FiltersModalProps = {
  onResetFilters: () => void;
} & Pick<BaseModalProps, 'title' | 'modal' | 'setModal' | 'onConfirm' | 'children'>;

export const FiltersModal: FC<FiltersModalProps> = (props) => {
  const { children, onResetFilters, ...other } = props;

  return (
    <BaseModal {...other}>
      {children}
      <Button sx={{ mt: 3 }} size={'small'} variant={'outlined'} onClick={onResetFilters}>
        Reset filters
      </Button>
    </BaseModal>
  );
};
