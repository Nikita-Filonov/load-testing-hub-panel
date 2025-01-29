import { CompareResultWithResults } from '../../../Models/Compares/CompareResultWithResults';
import { FC, useState } from 'react';
import { WidgetView } from '../../../Components/Views/WidgetView';
import { LoadTestResultCompareView } from '../LoadTestResultCompareView';
import { MethodResultsCompareView } from '../MethodResultsCompareView';
import { getLoadTestResultTitle } from '../../../Services/Results/Utils';
import { ShortLoadTestResultLabelsView } from '../../../Components/Labels/Results/LoadTestResults/ShortLoadTestResultLabelsView';
import { CompareWidgetType } from '../../../Models/Compares/CompareTableSettings';
import { LoadTestResultListItemMenu } from '../../../Components/Menus/Results/LoadTestsResults/LoadTestResultListItemMenu';
import { ShortLoadTestResult } from '../../../Models/Results/LoadTestResults';
import { MethodResultCompare } from '../../../Models/Compares/Compares';
import { CompareMethodResultsHistoryChartsModal } from '../../../Components/Modals/Compares/CompareMethodResultsHistoryChartsModal';
import { CompareMethodResultsHistoryProvider } from '../../../Providers/Compares/CompareMethodResultsHistoryProvider';
import { getDefaultMethodResultCompare } from '../../../Services/Compares/Utils';

type Props = {
  compare: CompareResultWithResults;
  loadTestResultId: number;
  onScenarioDetails: (result: ShortLoadTestResult) => void;
};

export const CompareResultWithResultsSingleView: FC<Props> = (props) => {
  const { compare, loadTestResultId, onScenarioDetails } = props;
  const [methodResultCompare, setMethodResultCompare] = useState<MethodResultCompare>(getDefaultMethodResultCompare());
  const [compareMethodResultsHistoryChartsModal, setCompareMethodResultsHistoryChartsModal] = useState(false);

  const onCompareMethodResultsHistory = (compare: MethodResultCompare) => {
    setMethodResultCompare(compare);
    setCompareMethodResultsHistoryChartsModal(true);
  };

  return (
    <WidgetView
      sx={{ mt: 3 }}
      title={getLoadTestResultTitle(compare.compareWithLoadTestResult)}
      label={<ShortLoadTestResultLabelsView result={compare.compareWithLoadTestResult} />}
      actions={[
        {
          content: (
            <LoadTestResultListItemMenu
              result={compare.compareWithLoadTestResult}
              onScenarioDetails={onScenarioDetails}
            />
          )
        }
      ]}
      allowClose
      defaultClose>
      <LoadTestResultCompareView
        compare={compare.loadTestResultCompare}
        widgetType={CompareWidgetType.CompareResultWithResults}
      />
      <MethodResultsCompareView
        compares={compare.methodResultCompares}
        widgetType={CompareWidgetType.CompareResultWithResults}
        onCompareMethodResultsHistory={onCompareMethodResultsHistory}
      />
      <CompareMethodResultsHistoryProvider>
        <CompareMethodResultsHistoryChartsModal
          modal={compareMethodResultsHistoryChartsModal}
          setModal={setCompareMethodResultsHistoryChartsModal}
          compare={methodResultCompare}
          widgetType={CompareWidgetType.CompareResultWithResults}
          loadTestResultId={loadTestResultId}
          compareWithLoadTestResults={[compare.compareWithLoadTestResult.id]}
        />
      </CompareMethodResultsHistoryProvider>
    </WidgetView>
  );
};
