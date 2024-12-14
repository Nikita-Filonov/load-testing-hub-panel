import { BaseModal } from '../BaseModal';
import { FC, useEffect, useState } from 'react';
import { CreateScenarioForm } from '../../Forms/Scenarios/CreateScenarioForm';
import { CreateScenarioRequest } from '../../../Models/Services/Scenarios';
import { useScenarios } from '../../../Providers/Services/ScenariosProvider';
import { getDefaultCreateScenarioRequest } from '../../../Services/Scenarios/Utils';

type CreateScenarioModalProps = {
  modal: boolean;
  setModal: (modal: boolean) => void;
  serviceId: number;
};

export const CreateScenarioModal: FC<CreateScenarioModalProps> = (props) => {
  const { modal, setModal, serviceId } = props;
  const { loading, createScenario } = useScenarios();
  const [request, setRequest] = useState<CreateScenarioRequest>(getDefaultCreateScenarioRequest());

  useEffect(() => {
    modal && setRequest(getDefaultCreateScenarioRequest());
  }, [modal]);

  const onClose = () => setModal(false);

  const onCreate = async () => {
    const error = await createScenario({ ...request, serviceId });
    !error && onClose();
  };

  return (
    <BaseModal
      title={'Create scenario'}
      modal={modal}
      setModal={setModal}
      onConfirm={onCreate}
      confirmLoading={loading.createScenario}>
      <CreateScenarioForm request={request} setRequest={setRequest} />
    </BaseModal>
  );
};
