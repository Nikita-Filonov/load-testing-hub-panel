import { FC } from 'react';
import { useLoadTestResults } from '../../../Providers/Results/LoadTestResultsProvider';
import { DeleteModal } from '../DeleteModal';

type DeleteLoadTestResultModalProps = {
  modal: boolean;
  setModal: (modal: boolean) => void;
  loadTestResultId: number;
};

export const DeleteLoadTestResultModal: FC<DeleteLoadTestResultModalProps> = (props) => {
  const { modal, setModal, loadTestResultId } = props;
  const { loading, deleteLoadTestResult } = useLoadTestResults();

  const onClose = () => setModal(false);

  const onDelete = async () => {
    const error = await deleteLoadTestResult(loadTestResultId);
    !error && onClose();
  };

  return (
    <DeleteModal
      title={'Delete load tests result?'}
      modal={modal}
      setModal={setModal}
      onConfirm={onDelete}
      confirmLoading={loading.deleteLoadTestResult}
    />
  );
};
