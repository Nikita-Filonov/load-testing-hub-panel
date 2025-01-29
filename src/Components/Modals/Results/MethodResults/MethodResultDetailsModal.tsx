import { FC } from 'react';
import { BaseModal } from '../../BaseModal';
import MethodResultDetailsView from '../../../../Views/Results/MethodResults/MethodResultDetailsView';
import MethodResultsHistoryChartsView from '../../../../Views/Results/MethodResultsHistory/MethodResultsHistoryChartsView';
import { MethodResultsHistoryProvider } from '../../../../Providers/Results/MethodResultsHistoryProvider';

type MethodResultDetailsModalProps = {
  modal: boolean;
  setModal: (modal: boolean) => void;
  methodResultId: number;
};

export const MethodResultDetailsModal: FC<MethodResultDetailsModalProps> = (props) => {
  const { modal, setModal, methodResultId } = props;

  return (
    <BaseModal title={'Method result details'} modal={modal} setModal={setModal} maxWidth={'lg'}>
      <MethodResultDetailsView methodResultId={methodResultId} />
      <MethodResultsHistoryProvider>
        <MethodResultsHistoryChartsView methodResultId={methodResultId} />
      </MethodResultsHistoryProvider>
    </BaseModal>
  );
};
