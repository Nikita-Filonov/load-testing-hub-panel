import { FC } from 'react';
import { BaseModal } from '../BaseModal';
import ScenarioDetailsView from '../../../Views/Scenarios/ScenarioDetailsView';

type ScenarioDetailsModalProps = {
  modal: boolean;
  setModal: (modal: boolean) => void;
  scenarioName: string;
};

export const ScenarioDetailsModal: FC<ScenarioDetailsModalProps> = (props) => {
  const { modal, setModal, scenarioName } = props;

  return (
    <BaseModal title={'Scenario details'} modal={modal} setModal={setModal}>
      <ScenarioDetailsView scenarioName={scenarioName} />
    </BaseModal>
  );
};
