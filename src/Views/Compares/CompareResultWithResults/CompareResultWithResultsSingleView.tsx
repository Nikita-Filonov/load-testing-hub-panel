import { CompareResultWithResults } from '../../../Models/Compares/CompareResultWithResults';
import { FC } from 'react';
import { WidgetView } from '../../../Components/Views/WidgetView';
import { LoadTestResultCompareView } from '../LoadTestResultCompareView';
import { MethodResultsCompareView } from '../MethodResultsCompareView';
import { getLoadTestResultTitle } from '../../../Services/Results/Utils';
import { ShortLoadTestResultLabelsView } from '../../../Components/Labels/Results/LoadTestResults/ShortLoadTestResultLabelsView';
import { CompareResultWithResultsViewMenu } from '../../../Components/Menus/Results/LoadTestsResults/CompareResultWithResultsViewMenu';
import { CompareWidgetType } from '../../../Models/Compares/CompareTableSettings';

type CompareResultWithResultsSingleViewProps = {
  compare: CompareResultWithResults;
};

export const CompareResultWithResultsSingleView: FC<CompareResultWithResultsSingleViewProps> = ({ compare }) => {
  return (
    <WidgetView
      sx={{ mt: 3 }}
      title={getLoadTestResultTitle(compare.compareWithLoadTestResult)}
      label={<ShortLoadTestResultLabelsView result={compare.compareWithLoadTestResult} />}
      actions={[{ content: <CompareResultWithResultsViewMenu result={compare.compareWithLoadTestResult} /> }]}
      allowClose={true}>
      <LoadTestResultCompareView
        compare={compare.loadTestResultCompare}
        widgetType={CompareWidgetType.CompareResultWithResults}
      />
      <MethodResultsCompareView
        compares={compare.methodResultCompares}
        widgetType={CompareWidgetType.CompareResultWithResults}
      />
    </WidgetView>
  );
};
