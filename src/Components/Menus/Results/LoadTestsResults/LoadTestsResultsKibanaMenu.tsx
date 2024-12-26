import { FC, useState } from 'react';
import { BaseMenu } from '../../BaseMenu';
import { BaseMenuItem } from '../../BaseMenuItem';
import InsightsIcon from '@mui/icons-material/Insights';
import { Integration } from '../../../../Models/Integrations/Integrations';
import { useIntegrations } from '../../../../Providers/Integrations/IntegrationsProvider';
import { connect } from 'react-redux';
import { ReduxState } from '../../../../Redux/ReduxState';
import { Service } from '../../../../Models/Services/Services';
import { IntegrationEnvironmentTypeLabel } from '../../../Labels/Integrations/IntegrationEnvironmentTypeLabel';

type LoadTestsResultsKibanaMenuProps = {
  service: Service;
  integrations: Integration[];
  loadTestResultId: number;
};

const LoadTestsResultsKibanaMenu: FC<LoadTestsResultsKibanaMenuProps> = (props) => {
  const { service, integrations, loadTestResultId } = props;
  const { loading, buildKibanaDiscoverURL } = useIntegrations();
  const [menu, setMenu] = useState<null | HTMLElement>(null);

  const onClose = () => setMenu(null);

  const onOpenKibanaDiscoverUrl = (integrationId: number) => async () => {
    const response = await buildKibanaDiscoverURL({
      serviceId: service.id,
      integrationId,
      loadTestResultId
    });
    if (response) {
      window.open(response.discoverUrl, '_blank');
    }

    onClose();
  };

  return (
    <BaseMenu
      menu={menu}
      setMenu={setMenu}
      icon={<InsightsIcon />}
      loading={loading.buildKibanaDiscoverURL}
      disabled={integrations.length === 0 && !loading.buildKibanaDiscoverURL}>
      {integrations.map((integration, index) => (
        <BaseMenuItem
          key={index}
          icon={<InsightsIcon />}
          title={`Open ${integration.name} kibana discover`}
          label={<IntegrationEnvironmentTypeLabel type={integration.environmentType} />}
          onClick={onOpenKibanaDiscoverUrl(integration.id)}
        />
      ))}
    </BaseMenu>
  );
};

const getState = (state: ReduxState) => ({
  service: state.services.service,
  integrations: state.integrations.integrations
});
export default connect(getState)(LoadTestsResultsKibanaMenu);
