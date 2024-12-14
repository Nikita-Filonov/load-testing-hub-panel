import { FC } from 'react';
import { BaseModal } from '../BaseModal';
import ScenarioDetailsView from '../../../Views/Scenarios/ScenarioDetailsView';

type ScenarioDetailsModalProps = {
  modal: boolean;
  setModal: (modal: boolean) => void;
  scenarioId: number;
};

export const ScenarioDetailsModal: FC<ScenarioDetailsModalProps> = (props) => {
  const { modal, setModal, scenarioId } = props;

  return (
    <BaseModal title={'Scenario details'} modal={modal} setModal={setModal} maxWidth={'md'}>
      <ScenarioDetailsView scenarioId={scenarioId} />
    </BaseModal>
  );
};
