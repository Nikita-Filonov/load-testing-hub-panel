import { BaseModal } from '../BaseModal';
import { FC, useEffect, useState } from 'react';
import { CreateServiceForm } from '../../Forms/Services/CreateServiceForm';
import { CreateServiceRequest } from '../../../Models/Services/Services';
import { useServices } from '../../../Providers/Services/ServicesProvider';
import { getDefaultCreateServiceRequest } from '../../../Services/Services/Utils';

type CreateServiceModalProps = {
  modal: boolean;
  setModal: (modal: boolean) => void;
};

export const CreateServiceModal: FC<CreateServiceModalProps> = ({ modal, setModal }) => {
  const { loading, createService } = useServices();
  const [request, setRequest] = useState<CreateServiceRequest>(getDefaultCreateServiceRequest());

  useEffect(() => {
    modal && setRequest(getDefaultCreateServiceRequest());
  }, [modal]);

  const onClose = () => setModal(false);

  const onCreate = async () => {
    const error = await createService(request);
    !error && onClose();
  };

  return (
    <BaseModal
      title={'Create service'}
      modal={modal}
      setModal={setModal}
      onConfirm={onCreate}
      confirmLoading={loading.createService}>
      <CreateServiceForm request={request} setRequest={setRequest} />
    </BaseModal>
  );
};
