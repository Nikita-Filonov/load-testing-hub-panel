import { CompareSettingsProvider } from '../../Providers/Compares/CompareSettingsProvider';
import UpdateCompareSettingsHighlightThresholdView from '../../Views/Compares/CompareSettings/UpdateCompareSettingsHighlightThresholdView';

const CompareHighlightThresholdSettingsPage = () => {
  return (
    <CompareSettingsProvider>
      <UpdateCompareSettingsHighlightThresholdView />
    </CompareSettingsProvider>
  );
};

export default CompareHighlightThresholdSettingsPage;
