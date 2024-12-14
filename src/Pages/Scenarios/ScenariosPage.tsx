import ScenariosSettingsView from '../../Views/Scenarios/ScenariosListView';
import { ScenariosProvider } from '../../Providers/Services/ScenariosProvider';
import { MainLayout } from '../../Components/Layouts/MainLayouts';

const ScenariosPage = () => {
  return (
    <MainLayout>
      <ScenariosProvider>
        <ScenariosSettingsView />
      </ScenariosProvider>
    </MainLayout>
  );
};

export default ScenariosPage;
