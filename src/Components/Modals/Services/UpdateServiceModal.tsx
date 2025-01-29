import { BaseModal } from '../BaseModal';
import { FC, useEffect, useState } from 'react';
import { CreateServiceForm } from '../../Forms/Services/CreateServiceForm';
import { ServiceDetails, UpdateServiceRequest } from '../../../Models/Services/Services';
import { ServicesErrorKey, useServices } from '../../../Providers/Services/ServicesProvider';
import { connect } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { getDefaultCreateServiceRequest } from '../../../Services/Services/Utils';
import { useValidationErrors } from '../../../Services/Clients/Hooks';

type UpdateServiceModalProps = {
  modal: boolean;
  setModal: (modal: boolean) => void;
  serviceId: number;
  details: ServiceDetails;
};

const UpdateServiceModal: FC<UpdateServiceModalProps> = (props) => {
  const { modal, setModal, serviceId, details } = props;
  const { loading, updateService, getServiceDetails } = useServices();
  const { validationErrors, clearValidationErrors } = useValidationErrors({ key: ServicesErrorKey.UpdateService });
  const [request, setRequest] = useState<UpdateServiceRequest>(getDefaultCreateServiceRequest());

  useEffect(() => {
    if (modal) {
      setRequest(details);
    }
  }, [modal, details]);

  useEffect(() => {
    if (modal) {
      getServiceDetails(serviceId);
    }
  }, [modal, serviceId]);

  const onClose = () => {
    setModal(false);
    clearValidationErrors();
  };

  const onUpdate = async () => {
    const result = await updateService(serviceId, request);
    if (!result.error) {
      onClose();
    }
  };

  return (
    <BaseModal
      title={'Update service'}
      modal={modal}
      setModal={setModal}
      onCancel={onClose}
      onConfirm={onUpdate}
      loading={loading.getServiceDetails}
      confirmLoading={loading.updateService}>
      <CreateServiceForm request={request} setRequest={setRequest} validationErrors={validationErrors} />
    </BaseModal>
  );
};

const getState = (state: ReduxState) => ({ details: state.services.serviceDetails });
export default connect(getState)(UpdateServiceModal);
