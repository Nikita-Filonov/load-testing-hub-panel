import { FC, Fragment, useState } from 'react';
import { BaseMenu } from '../BaseMenu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Service } from '../../../Models/Services/Services';
import { ViewDetailsMenuItem } from '../../MenuItems/ViewDetailsMenuItem';
import { EditMenuItem } from '../../MenuItems/EditMenuItem';
import { CopyIDMenuItem } from '../../MenuItems/CopyIDMenuItem';
import { DeleteMenuItem } from '../../MenuItems/DeleteMenuItem';
import { DeleteServiceModal } from '../../Modals/Services/DeleteServiceModal';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LinkIcon from '@mui/icons-material/Link';
import { BaseMenuItem } from '../BaseMenuItem';
import { useLoadTestResultsNavigation } from '../../../Services/Results/Hooks';

type ServiceListItemMenuProps = {
  service: Service;
  onUpdateService: (service: Service) => void;
  onServiceDetails: (service: Service) => void;
};

export const ServiceListItemMenu: FC<ServiceListItemMenuProps> = (props) => {
  const { service, onUpdateService, onServiceDetails } = props;
  const { getResultsURL } = useLoadTestResultsNavigation();
  const [menu, setMenu] = useState<null | HTMLElement>(null);
  const [deleteServiceModal, setDeleteServiceModal] = useState(false);

  const onClose = () => setMenu(null);

  const onDetails = () => {
    onClose();
    onServiceDetails(service);
  };

  const onEdit = () => {
    onClose();
    onUpdateService(service);
  };

  const onDelete = () => {
    onClose();
    setDeleteServiceModal(true);
  };

  const onCopyIdentifier = async () => {
    onClose();
    await navigator.clipboard.writeText(`${service.id}`);
  };

  const onCopyResultsURL = async () => {
    onClose();
    await navigator.clipboard.writeText(getResultsURL(service.id));
  };

  const onOpenServiceURL = () => {
    onClose();
    window.open(service.url, '_blank');
  };

  return (
    <Fragment>
      <BaseMenu menu={menu} setMenu={setMenu} icon={<MoreVertIcon />}>
        <ViewDetailsMenuItem onDetails={onDetails} />
        <CopyIDMenuItem onCopy={onCopyIdentifier} />
        <BaseMenuItem icon={<ContentCopyIcon />} title={'Copy results URL'} onClick={onCopyResultsURL} />
        <BaseMenuItem icon={<LinkIcon />} title={'Open service URL'} onClick={onOpenServiceURL} />
        <EditMenuItem onEdit={onEdit} />
        <DeleteMenuItem onDelete={onDelete} />
      </BaseMenu>
      <DeleteServiceModal modal={deleteServiceModal} setModal={setDeleteServiceModal} serviceId={service.id} />
    </Fragment>
  );
};
