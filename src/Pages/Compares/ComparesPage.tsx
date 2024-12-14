import UpdateCompareSettingsView from '../../Views/Compares/UpdateCompareSettingsView';
import { CompareSettingsProvider } from '../../Providers/Compares/CompareSettingsProvider';
import { MainLayout } from '../../Components/Layouts/MainLayouts';

const ComparesPage = () => {
  return (
    <MainLayout>
      <CompareSettingsProvider>
        <UpdateCompareSettingsView />
      </CompareSettingsProvider>
    </MainLayout>
  );
};

export default ComparesPage;
