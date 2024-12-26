import { IntegrationsProvider } from '../../Providers/Integrations/IntegrationsProvider';
import IntegrationsListView from '../../Views/Integrations/IntegrationsListView';
import { MainLayout } from '../../Components/Layouts/MainLayouts';

const IntegrationsPage = () => {
  return (
    <MainLayout>
      <IntegrationsProvider>
        <IntegrationsListView />
      </IntegrationsProvider>
    </MainLayout>
  );
};

export default IntegrationsPage;
