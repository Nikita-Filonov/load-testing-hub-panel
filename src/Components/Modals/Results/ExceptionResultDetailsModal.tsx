import { BaseModal } from '../BaseModal';
import { FC } from 'react';
import ExceptionResultDetailsView from '../../../Views/Results/ExceptionResults/ExceptionResultDetailsView';

type ExceptionResultDetailsModalProps = {
  modal: boolean;
  setModal: (modal: boolean) => void;
  exceptionResultId: number;
};

export const ExceptionResultDetailsModal: FC<ExceptionResultDetailsModalProps> = (props) => {
  const { modal, setModal, exceptionResultId } = props;

  return (
    <BaseModal title={'Exception result details'} modal={modal} setModal={setModal}>
      <ExceptionResultDetailsView exceptionResultId={exceptionResultId} />
    </BaseModal>
  );
};
