import { FC } from 'react';
import { DeleteModal } from '../DeleteModal';
import { useServices } from '../../../Providers/Services/ServicesProvider';

type DeleteServiceModalProps = {
  modal: boolean;
  setModal: (modal: boolean) => void;
  serviceId: number;
};

export const DeleteServiceModal: FC<DeleteServiceModalProps> = (props) => {
  const { modal, setModal, serviceId } = props;
  const { loading, deleteService } = useServices();

  const onClose = () => setModal(false);

  const onDelete = async () => {
    const error = await deleteService(serviceId);
    !error && onClose();
  };

  return (
    <DeleteModal
      title={'Delete service?'}
      modal={modal}
      setModal={setModal}
      onConfirm={onDelete}
      confirmLoading={loading.deleteService}
    />
  );
};
