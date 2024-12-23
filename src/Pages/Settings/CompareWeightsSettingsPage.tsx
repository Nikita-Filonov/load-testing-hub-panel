import UpdateCompareSettingsWeightsView from '../../Views/Compares/CompareSettings/UpdateCompareSettingsWeightsView';
import { CompareSettingsProvider } from '../../Providers/Compares/CompareSettingsProvider';

const CompareWeightsSettingsPage = () => {
  return (
    <CompareSettingsProvider>
      <UpdateCompareSettingsWeightsView />
    </CompareSettingsProvider>
  );
};

export default CompareWeightsSettingsPage;
