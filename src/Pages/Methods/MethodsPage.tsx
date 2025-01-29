import { MainLayout } from '../../Components/Layouts/MainLayouts';
import MethodsListView from '../../Views/Methods/MethodsListView';
import { MethodsProvider } from '../../Providers/Methods/MethodsProvider';

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
