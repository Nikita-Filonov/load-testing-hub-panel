import { WidgetInfoRowsView } from '../../Components/Views/WidgetInfoRowsView';
import { BaseInfoRowView } from '../../Components/Views/BaseInfoRowView';
import { useScenarios } from '../../Providers/Services/ScenariosProvider';
import { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { ReduxState } from '../../Redux/ReduxState';
import { ScenarioDetails } from '../../Models/Services/Scenarios';
import { RatioResultsTreeView } from '../../Components/TreeView/Results/RatioResults/RatioResultsTreeView';
import { BoxView } from '../../Components/Views/BoxView';
import { ScenarioTagsLabel } from '../../Components/Labels/Scenarios/ScenarioTagsLabel';
import { ScenarioVersionLabel } from '../../Components/Labels/Scenarios/ScenarioVersionLabel';

type ScenarioDetailsViewProps = {
  details: ScenarioDetails;
  scenarioId: number;
};

const ScenarioDetailsView: FC<ScenarioDetailsViewProps> = ({ details, scenarioId }) => {
  const { loading, getScenarioDetails } = useScenarios();

  useEffect(() => {
    scenarioId && getScenarioDetails(scenarioId);
  }, [scenarioId]);

  return (
    <BoxView loading={loading.getScenarioDetails} containerSx={{ mt: 0 }}>
      <WidgetInfoRowsView containerSx={{ mt: 0 }}>
        <BaseInfoRowView name={'ID'} value={details.id} />
        <BaseInfoRowView name={'Name'} value={details.name} />
        <BaseInfoRowView name={'File'} value={details.file} />
        <BaseInfoRowView name={'Tags'} component={<ScenarioTagsLabel tags={details.tags} />} />
        <BaseInfoRowView name={'Version'} component={<ScenarioVersionLabel version={details.version} />} />
      </WidgetInfoRowsView>
      {details.ratioTotal.length > 0 && <RatioResultsTreeView title={'Total ratio'} results={details.ratioTotal} />}
      {details.ratioPerClass.length > 0 && (
        <RatioResultsTreeView title={'Ratio per class'} results={details.ratioPerClass} />
      )}
    </BoxView>
  );
};

const getState = (state: ReduxState) => ({
  details: state.scenarios.scenarioDetails
});
export default connect(getState)(ScenarioDetailsView);
