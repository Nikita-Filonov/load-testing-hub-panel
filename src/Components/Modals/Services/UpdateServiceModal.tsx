import { BaseModal } from '../BaseModal';
import { FC, useEffect, useState } from 'react';
import { CreateServiceForm } from '../../Forms/Services/CreateServiceForm';
import { ServiceDetails, UpdateServiceRequest } from '../../../Models/Services/Services';
import { useServices } from '../../../Providers/Services/ServicesProvider';
import { connect } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { getDefaultCreateServiceRequest } from '../../../Services/Services/Utils';

type UpdateServiceModalProps = {
  modal: boolean;
  setModal: (modal: boolean) => void;
  serviceId: number;
  details: ServiceDetails;
};

const UpdateServiceModal: FC<UpdateServiceModalProps> = (props) => {
  const { modal, setModal, serviceId, details } = props;
  const { loading, updateService, getServiceDetails } = useServices();
  const [request, setRequest] = useState<UpdateServiceRequest>(getDefaultCreateServiceRequest());

  useEffect(() => {
    modal &&
      setRequest({
        url: details.url,
        name: details.name,
        type: details.type,
        cluster: details.cluster,
        namespace: details.namespace
      });
  }, [modal, details]);

  useEffect(() => {
    modal && getServiceDetails(serviceId);
  }, [modal, serviceId]);

  const onClose = () => setModal(false);

  const onUpdate = async () => {
    const error = await updateService(serviceId, request);
    !error && onClose();
  };

  return (
    <BaseModal
      title={'Update service'}
      modal={modal}
      setModal={setModal}
      loading={loading.getServiceDetails}
      confirmLoading={loading.updateService}
      onConfirm={onUpdate}>
      <CreateServiceForm request={request} setRequest={setRequest} />
    </BaseModal>
  );
};

const getState = (state: ReduxState) => ({ details: state.services.serviceDetails });
export default connect(getState)(UpdateServiceModal);
