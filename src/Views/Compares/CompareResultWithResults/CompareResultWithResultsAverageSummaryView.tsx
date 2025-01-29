import { WidgetView } from '../../../Components/Views/WidgetView';
import { FC, useState } from 'react';
import { CompareResultWithResultsAverageSummary } from '../../../Models/Compares/CompareResultWithResults';
import { LoadTestResultCompareView } from '../LoadTestResultCompareView';
import { MethodResultsCompareView } from '../MethodResultsCompareView';
import { connect } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { BaseLabel } from '../../../Components/Labels/BaseLabel';
import { CompareWidgetType } from '../../../Models/Compares/CompareTableSettings';
import { CompareMethodResultsHistoryChartsModal } from '../../../Components/Modals/Compares/CompareMethodResultsHistoryChartsModal';
import { CompareMethodResultsHistoryProvider } from '../../../Providers/Compares/CompareMethodResultsHistoryProvider';
import { MethodResultCompare } from '../../../Models/Compares/Compares';
import { getDefaultMethodResultCompare } from '../../../Services/Compares/Utils';

type Props = {
  summary: CompareResultWithResultsAverageSummary;
  loadTestResultId: number;
  compareWithLoadTestResults: number[];
};

const CompareResultWithResultsAverageSummaryView: FC<Props> = (props) => {
  const { summary, loadTestResultId, compareWithLoadTestResults } = props;
  const [methodResultCompare, setMethodResultCompare] = useState<MethodResultCompare>(getDefaultMethodResultCompare());
  const [compareMethodResultsHistoryChartsModal, setCompareMethodResultsHistoryChartsModal] = useState(false);

  const onCompareMethodResultsHistory = (compare: MethodResultCompare) => {
    setMethodResultCompare(compare);
    setCompareMethodResultsHistoryChartsModal(true);
  };

  if (compareWithLoadTestResults.length === 0) {
    return null;
  }

  return (
    <WidgetView
      sx={{ mt: 3 }}
      title={'Average summary'}
      label={<BaseLabel label={`Results: ${compareWithLoadTestResults.length}`} color={'info'} />}
      allowClose
      defaultClose>
      <LoadTestResultCompareView
        compare={summary.loadTestResultCompare}
        widgetType={CompareWidgetType.CompareResultWithResultsAverageSummary}
      />
      <MethodResultsCompareView
        compares={summary.methodResultCompares}
        widgetType={CompareWidgetType.CompareResultWithResultsAverageSummary}
        onCompareMethodResultsHistory={onCompareMethodResultsHistory}
      />
      <CompareMethodResultsHistoryProvider>
        <CompareMethodResultsHistoryChartsModal
          modal={compareMethodResultsHistoryChartsModal}
          setModal={setCompareMethodResultsHistoryChartsModal}
          compare={methodResultCompare}
          widgetType={CompareWidgetType.CompareResultWithResultsAverageSummary}
          loadTestResultId={loadTestResultId}
          compareWithLoadTestResults={compareWithLoadTestResults}
        />
      </CompareMethodResultsHistoryProvider>
    </WidgetView>
  );
};

const getState = (state: ReduxState) => ({
  summary: state.compareResultWithResults.compareResultWithResultsAverageSummary
});
export default connect(getState)(CompareResultWithResultsAverageSummaryView);
