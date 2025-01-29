import { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useIntegrations } from '../../../Providers/Integrations/IntegrationsProvider';
import { ShortIntegration } from '../../../Models/Integrations/Integrations';
import { IntegrationMenuItem } from '../../MenuItems/Integration/IntegrationMenuItem';
import { BaseMenu } from '../BaseMenu';
import { Service } from '../../../Models/Services/Services';
import { ReduxState } from '../../../Redux/ReduxState';
import HubOutlinedIcon from '@mui/icons-material/HubOutlined';

type Props = {
  service: Service;
  integrations: ShortIntegration[];
  loadTestResultId: number;
};

const IntegrationsMenu: FC<Props> = (props) => {
  const { service, integrations, loadTestResultId } = props;
  const { loading, getShortIntegrations, buildIntegrationURL } = useIntegrations();
  const [menu, setMenu] = useState<null | HTMLElement>(null);

  useEffect(() => {
    if (service.id) {
      getShortIntegrations({ serviceId: service.id });
    }
  }, [service.id]);

  const onClose = () => setMenu(null);

  const onOpenIntegrationUrl = async (integration: ShortIntegration) => {
    const result = await buildIntegrationURL({
      serviceId: service.id,
      systemType: integration.systemType,
      integrationId: integration.id,
      loadTestResultId
    });
    if (result.response) {
      window.open(result.response.integrationUrl, '_blank');
    }

    onClose();
  };

  return (
    <BaseMenu
      menu={menu}
      setMenu={setMenu}
      icon={<HubOutlinedIcon />}
      loading={loading.buildIntegrationURL}
      disabled={integrations.length === 0 || loading.getShortIntegrations}>
      {integrations.map((integration, index) => (
        <IntegrationMenuItem key={index} integration={integration} onOpenIntegration={onOpenIntegrationUrl} />
      ))}
    </BaseMenu>
  );
};

const getState = (state: ReduxState) => ({
  service: state.services.service,
  integrations: state.integrations.shortIntegrations
});
export default connect(getState)(IntegrationsMenu);
