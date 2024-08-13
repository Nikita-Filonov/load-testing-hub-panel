import { FC, useState } from 'react';
import { BaseMenu } from '../../BaseMenu';
import { BaseMenuItem } from '../../BaseMenuItem';
import { LoadTestResultDetails } from '../../../../Models/Results/LoadTestResults';
import { Service } from '../../../../Models/Services/Services';
import CodeIcon from '@mui/icons-material/Code';
import InsightsIcon from '@mui/icons-material/Insights';
import { useIntegrationsKibana } from '../../../../Providers/Integrations/IntegrationsKibanaProvider';

type LoadTestsResultsKibanaMenuProps = {
  details: LoadTestResultDetails;
  services: Service[];
};

export const LoadTestsResultsKibanaMenu: FC<LoadTestsResultsKibanaMenuProps> = (props) => {
  const { details, services } = props;
  const { getKibanaDiscoverUrl } = useIntegrationsKibana();
  const [menu, setMenu] = useState<null | HTMLElement>(null);

  const onClose = () => setMenu(null);

  const onOpenKibanaDiscoverUrl = (service: string) => async () => {
    const response = await getKibanaDiscoverUrl({
      service,
      startedAt: details.startedAt,
      finishedAt: details.finishedAt
    });
    if (response) {
      window.open(response.discoverUrl, '_blank');
    }

    onClose();
  };

  return (
    <BaseMenu menu={menu} setMenu={setMenu} icon={<InsightsIcon />}>
      {services.map((service, index) => (
        <BaseMenuItem
          key={index}
          icon={<CodeIcon />}
          label={`Open ${service.name} kibana discover`}
          onClick={onOpenKibanaDiscoverUrl(service.name)}
        />
      ))}
    </BaseMenu>
  );
};
