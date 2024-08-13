import { MainLayout } from '../../Components/Layouts/MainLayouts';
import MethodsListView from '../../Views/Methods/MethodsListView';
import { MethodsProvider } from '../../Providers/Results/MethodsProvider';

const MethodsPage = () => {
  return (
    <MainLayout>
      <MethodsProvider>
        <MethodsListView />
      </MethodsProvider>
    </MainLayout>
  );
};

export default MethodsPage;
