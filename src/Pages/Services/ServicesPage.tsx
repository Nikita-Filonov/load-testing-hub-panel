import { MainLayout } from '../../Components/Layouts/MainLayouts';
import ServicesSettingsView from '../../Views/Services/ServicesListView';
import { ServicesProvider } from '../../Providers/Services/ServicesProvider';

const ServicesPage = () => {
  return (
    <MainLayout>
      <ServicesProvider>
        <ServicesSettingsView />
      </ServicesProvider>
    </MainLayout>
  );
};

export default ServicesPage;
