import { FC } from 'react';
import { BaseModal } from '../BaseModal';
import ServiceDetailsView from '../../../Views/Services/ServiceDetailsView';

type ServiceDetailsModalProps = {
  modal: boolean;
  setModal: (modal: boolean) => void;
  serviceId: number;
};

export const ServiceDetailsModal: FC<ServiceDetailsModalProps> = (props) => {
  const { modal, setModal, serviceId } = props;

  return (
    <BaseModal title={'Service details'} modal={modal} setModal={setModal}>
      <ServiceDetailsView serviceId={serviceId} />
    </BaseModal>
  );
};
