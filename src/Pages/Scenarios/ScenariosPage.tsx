import ScenariosListView from '../../Views/Scenarios/ScenariosListView';
import { ScenariosProvider } from '../../Providers/Services/ScenariosProvider';
import { MainLayout } from '../../Components/Layouts/MainLayouts';

const ScenariosPage = () => {
  return (
    <MainLayout>
      <ScenariosProvider>
        <ScenariosListView />
      </ScenariosProvider>
    </MainLayout>
  );
};

export default ScenariosPage;
