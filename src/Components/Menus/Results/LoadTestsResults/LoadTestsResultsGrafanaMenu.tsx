import { FC, useState } from 'react';
import { BaseMenu } from '../../BaseMenu';
import { BaseMenuItem } from '../../BaseMenuItem';
import AddChartIcon from '@mui/icons-material/Addchart';
import { Service } from '../../../../Models/Services/Services';
import { Integration } from '../../../../Models/Integrations/Integrations';
import { ReduxState } from '../../../../Redux/ReduxState';
import { connect } from 'react-redux';
import { useIntegrations } from '../../../../Providers/Integrations/IntegrationsProvider';
import { IntegrationEnvironmentTypeLabel } from '../../../Labels/Integrations/IntegrationEnvironmentTypeLabel';

type LoadTestsResultsGrafanaMenuProps = {
  service: Service;
  integrations: Integration[];
  loadTestResultId: number;
};

const LoadTestsResultsGrafanaMenu: FC<LoadTestsResultsGrafanaMenuProps> = (props) => {
  const { service, integrations, loadTestResultId } = props;
  const { loading, buildGrafanaDiscoverURL } = useIntegrations();
  const [menu, setMenu] = useState<null | HTMLElement>(null);

  const onClose = () => setMenu(null);

  const onOpenGrafanaDashboardUrl = (integrationId: number) => async () => {
    const response = await buildGrafanaDiscoverURL({
      serviceId: service.id,
      integrationId,
      loadTestResultId
    });
    if (response) {
      window.open(response.dashboardUrl, '_blank');
    }

    onClose();
  };

  return (
    <BaseMenu
      menu={menu}
      setMenu={setMenu}
      icon={<AddChartIcon />}
      loading={loading.buildGrafanaDiscoverURL}
      disabled={integrations.length === 0 && !loading.buildGrafanaDiscoverURL}>
      {integrations.map((integration, index) => (
        <BaseMenuItem
          key={index}
          icon={<AddChartIcon />}
          title={`Open ${integration.name} grafana dashboard`}
          label={<IntegrationEnvironmentTypeLabel type={integration.environmentType} />}
          onClick={onOpenGrafanaDashboardUrl(integration.id)}
        />
      ))}
    </BaseMenu>
  );
};

const getState = (state: ReduxState) => ({
  service: state.services.service,
  integrations: state.integrations.integrations
});
export default connect(getState)(LoadTestsResultsGrafanaMenu);
