import { FC, useState } from 'react';
import { BaseMenu } from '../../BaseMenu';
import { BaseMenuItem } from '../../BaseMenuItem';
import AddChartIcon from '@mui/icons-material/Addchart';
import { LoadTestResultDetails } from '../../../../Models/Results/LoadTestResults';
import { Service } from '../../../../Models/Services/Services';
import CodeIcon from '@mui/icons-material/Code';
import { useIntegrationsGrafana } from '../../../../Providers/Integrations/IntegrationsGrafanaProvider';

type LoadTestsResultsGrafanaMenuProps = {
  details: LoadTestResultDetails;
  services: Service[];
};

export const LoadTestsResultsGrafanaMenu: FC<LoadTestsResultsGrafanaMenuProps> = (props) => {
  const { details, services } = props;
  const { getGrafanaDashboardUrl } = useIntegrationsGrafana();
  const [menu, setMenu] = useState<null | HTMLElement>(null);

  const onClose = () => setMenu(null);

  const onOpenGrafanaDashboardUrl = (service: string) => async () => {
    const response = await getGrafanaDashboardUrl({
      service,
      startedAt: details.startedAt,
      finishedAt: details.finishedAt
    });
    if (response) {
      window.open(response.dashboardUrl, '_blank');
    }

    onClose();
  };

  return (
    <BaseMenu menu={menu} setMenu={setMenu} icon={<AddChartIcon />}>
      {services.map((service, index) => (
        <BaseMenuItem
          key={index}
          icon={<CodeIcon />}
          label={`Open ${service.name} grafana dashboard`}
          onClick={onOpenGrafanaDashboardUrl(service.name)}
        />
      ))}
    </BaseMenu>
  );
};
