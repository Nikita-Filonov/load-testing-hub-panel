import { BaseModal } from '../BaseModal';
import { FC, useEffect, useState } from 'react';
import { CreateScenarioForm } from '../../Forms/Scenarios/CreateScenarioForm';
import { CreateScenarioRequest } from '../../../Models/Services/Scenarios';
import { ScenariosErrorKey, useScenarios } from '../../../Providers/Services/ScenariosProvider';
import { getDefaultCreateScenarioRequest } from '../../../Services/Scenarios/Utils';
import { useValidationErrors } from '../../../Services/Clients/Hooks';

type CreateScenarioModalProps = {
  modal: boolean;
  setModal: (modal: boolean) => void;
  serviceId: number;
};

export const CreateScenarioModal: FC<CreateScenarioModalProps> = (props) => {
  const { modal, setModal, serviceId } = props;
  const { loading, createScenario } = useScenarios();
  const { validationErrors, clearValidationErrors } = useValidationErrors({ key: ScenariosErrorKey.CreateScenario });
  const [request, setRequest] = useState<CreateScenarioRequest>(getDefaultCreateScenarioRequest());

  useEffect(() => {
    if (modal) {
      setRequest(getDefaultCreateScenarioRequest());
    }
  }, [modal]);

  const onClose = () => {
    setModal(false);
    clearValidationErrors();
  };

  const onCreate = async () => {
    const result = await createScenario({ ...request, serviceId });
    if (!result.error) {
      onClose();
    }
  };

  return (
    <BaseModal
      title={'Create scenario'}
      modal={modal}
      setModal={setModal}
      onCancel={onClose}
      onConfirm={onCreate}
      confirmLoading={loading.createScenario}>
      <CreateScenarioForm request={request} setRequest={setRequest} validationErrors={validationErrors} />
    </BaseModal>
  );
};
