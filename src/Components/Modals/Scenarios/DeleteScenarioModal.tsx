import { FC } from 'react';
import { DeleteModal } from '../DeleteModal';
import { useScenarios } from '../../../Providers/Services/ScenariosProvider';

type DeleteScenarioModalProps = {
  modal: boolean;
  setModal: (modal: boolean) => void;
  scenarioId: number;
};

export const DeleteScenarioModal: FC<DeleteScenarioModalProps> = (props) => {
  const { modal, setModal, scenarioId } = props;
  const { loading, deleteScenario } = useScenarios();

  const onClose = () => setModal(false);

  const onDelete = async () => {
    const result = await deleteScenario(scenarioId);
    if (!result.error) {
      onClose();
    }
  };

  return (
    <DeleteModal
      title={'Delete scenario?'}
      modal={modal}
      setModal={setModal}
      onConfirm={onDelete}
      confirmLoading={loading.deleteScenario}
    />
  );
};
