import { WidgetView } from '../../../Components/Views/WidgetView';
import { FC } from 'react';
import { CompareResultWithResultsAverageSummary } from '../../../Models/Compares/CompareResultWithResults';
import { LoadTestResultCompareView } from '../LoadTestResultCompareView';
import { MethodResultsCompareView } from '../MethodResultsCompareView';
import { connect } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { BaseLabel } from '../../../Components/Labels/BaseLabel';
import { CompareWidgetType } from '../../../Models/Compares/CompareTableSettings';

type CompareResultWithResultsAverageSummaryViewProps = {
  summary: CompareResultWithResultsAverageSummary;
  compareWithLoadTestResults: number[];
};

const CompareResultWithResultsAverageSummaryView: FC<CompareResultWithResultsAverageSummaryViewProps> = (props) => {
  const { summary, compareWithLoadTestResults } = props;

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
      />
    </WidgetView>
  );
};

const getState = (state: ReduxState) => ({ summary: state.compares.compareResultWithResultsAverageSummary });
export default connect(getState)(CompareResultWithResultsAverageSummaryView);
