import { BaseModal } from '../BaseModal';
import { FC, useEffect, useState } from 'react';
import { CreateServiceForm } from '../../Forms/Services/CreateServiceForm';
import { CreateServiceRequest } from '../../../Models/Services/Services';
import { ServicesErrorKey, useServices } from '../../../Providers/Services/ServicesProvider';
import { getDefaultCreateServiceRequest } from '../../../Services/Services/Utils';
import { useValidationErrors } from '../../../Services/Clients/Hooks';

type CreateServiceModalProps = {
  modal: boolean;
  setModal: (modal: boolean) => void;
};

export const CreateServiceModal: FC<CreateServiceModalProps> = ({ modal, setModal }) => {
  const { loading, createService } = useServices();
  const { validationErrors, clearValidationErrors } = useValidationErrors({ key: ServicesErrorKey.CreateService });
  const [request, setRequest] = useState<CreateServiceRequest>(getDefaultCreateServiceRequest());

  useEffect(() => {
    if (modal) {
      setRequest(getDefaultCreateServiceRequest());
    }
  }, [modal]);

  const onClose = () => {
    setModal(false);
    clearValidationErrors();
  };

  const onCreate = async () => {
    const result = await createService(request);
    if (!result.error) {
      onClose();
    }
  };

  return (
    <BaseModal
      title={'Create service'}
      modal={modal}
      setModal={setModal}
      onCancel={onClose}
      onConfirm={onCreate}
      confirmLoading={loading.createService}>
      <CreateServiceForm request={request} setRequest={setRequest} validationErrors={validationErrors} />
    </BaseModal>
  );
};
