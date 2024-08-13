import { WidgetView } from '../../../Components/Views/WidgetView';
import { RatioResultsTreeView } from '../../../Components/TreeView/Results/RatioResults/RatioResultsTreeView';
import { connect } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { RatioResult } from '../../../Models/Results/RatioResults';
import { FC, useEffect } from 'react';
import { useRatioResults } from '../../../Providers/Results/RatioResultsProvider';
import { EmptyView } from '../../../Components/Views/EmptyView';

type RatioResultsViewProps = {
  loadTestResultId: number;
  ratioResultsTotal: RatioResult[];
  ratioResultsPerClass: RatioResult[];
};

const RatioResultsView: FC<RatioResultsViewProps> = (props) => {
  const { loadTestResultId, ratioResultsTotal, ratioResultsPerClass } = props;
  const { loading, getRatioResults } = useRatioResults();

  useEffect(() => {
    loadTestResultId && getRatioResults(loadTestResultId);
  }, [loadTestResultId]);

  return (
    <WidgetView sx={{ mt: 3 }} title={'Ratio'} loading={loading.getRatioResults}>
      {ratioResultsTotal.length === 0 && ratioResultsPerClass.length === 0 && (
        <EmptyView
          title={'There is no ratio for this result'}
          description={
            'The script load distribution will be displayed here, for some reason this script does not have this information'
          }
        />
      )}
      {ratioResultsTotal.length > 0 && <RatioResultsTreeView title={'Total ratio'} results={ratioResultsTotal} />}
      {ratioResultsPerClass.length > 0 && (
        <RatioResultsTreeView title={'Ratio per class'} results={ratioResultsPerClass} />
      )}
    </WidgetView>
  );
};

const getState = (state: ReduxState) => ({
  ratioResultsTotal: state.ratioResults.ratioResultsTotal,
  ratioResultsPerClass: state.ratioResults.ratioResultsPerClass
});
export default connect(getState)(RatioResultsView);
