import { FC, Fragment, useState } from 'react';
import { BaseMenu } from '../BaseMenu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ViewDetailsMenuItem } from '../../MenuItems/ViewDetailsMenuItem';
import { EditMenuItem } from '../../MenuItems/EditMenuItem';
import { DeleteMenuItem } from '../../MenuItems/DeleteMenuItem';
import { Integration } from '../../../Models/Integrations/Integrations';
import { DeleteIntegrationModal } from '../../Modals/Integrations/DeleteIntegrationModal';

type IntegrationListItemMenuProps = {
  integration: Integration;
  onUpdateIntegration: (integration: Integration) => void;
  onIntegrationDetails: (integration: Integration) => void;
};

export const IntegrationListItemMenu: FC<IntegrationListItemMenuProps> = (props) => {
  const { integration, onUpdateIntegration, onIntegrationDetails } = props;
  const [menu, setMenu] = useState<null | HTMLElement>(null);
  const [deleteIntegrationModal, setDeleteIntegrationModal] = useState(false);

  const onClose = () => setMenu(null);

  const onDetails = () => {
    onClose();
    onIntegrationDetails(integration);
  };

  const onEdit = () => {
    onClose();
    onUpdateIntegration(integration);
  };

  const onDelete = () => {
    onClose();
    setDeleteIntegrationModal(true);
  };

  return (
    <Fragment>
      <BaseMenu menu={menu} setMenu={setMenu} icon={<MoreVertIcon />}>
        <ViewDetailsMenuItem onDetails={onDetails} />
        <EditMenuItem onEdit={onEdit} />
        <DeleteMenuItem onDelete={onDelete} />
      </BaseMenu>
      <DeleteIntegrationModal
        modal={deleteIntegrationModal}
        setModal={setDeleteIntegrationModal}
        integrationId={integration.id}
      />
    </Fragment>
  );
};
