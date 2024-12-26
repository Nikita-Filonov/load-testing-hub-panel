import { BaseModal } from '../BaseModal';
import { Service, ServiceDetails } from '../../../Models/Services/Services';
import { FC, useEffect, useState } from 'react';
import { ServiceSelect } from '../../Selects/Services/ServiceSelect';
import { useServices } from '../../../Providers/Services/ServicesProvider';
import { connect } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';

type AutoFillServiceModalProps = {
  modal: boolean;
  setModal: (modal: boolean) => void;
  services: Service[];
  onCallback: (details: ServiceDetails) => void;
};

const AutoFillServiceModal: FC<AutoFillServiceModalProps> = (props) => {
  const { modal, setModal, services, onCallback } = props;
  const { loading, getServices, getServiceDetails } = useServices();
  const [serviceId, setServiceId] = useState<number | null>(null);

  useEffect(() => {
    modal && getServices();
  }, [modal]);

  const onClose = () => setModal(false);

  const onAutoFill = async () => {
    if (!serviceId) return;

    const response = await getServiceDetails(serviceId);
    if (response) {
      onCallback(response.details);
      onClose();
    }
  };

  return (
    <BaseModal
      title={'Autofill service'}
      modal={modal}
      setModal={setModal}
      loading={loading.getServices}
      onConfirm={onAutoFill}
      confirmDisabled={!serviceId}
      confirmLoading={loading.getServiceDetails}>
      <ServiceSelect services={services} serviceId={serviceId} onSelectService={setServiceId} />
    </BaseModal>
  );
};

const getState = (state: ReduxState) => ({ services: state.services.services });
export default connect(getState)(AutoFillServiceModal);
