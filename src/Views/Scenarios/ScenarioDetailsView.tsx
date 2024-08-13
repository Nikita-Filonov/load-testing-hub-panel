import { WidgetView } from '../../Components/Views/WidgetView';
import { WidgetInfoRowsView } from '../../Components/Views/WidgetInfoRowsView';
import { BaseInfoRowView } from '../../Components/Views/BaseInfoRowView';
import { useScenarios } from '../../Providers/Services/ScenariosProvider';
import { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { ReduxState } from '../../Redux/ReduxState';
import { ScenarioDetails } from '../../Models/Services/Scenarios';
import { RatioResultsTreeView } from '../../Components/TreeView/Results/RatioResults/RatioResultsTreeView';

type ScenarioDetailsViewProps = {
  details: ScenarioDetails;
  scenarioName: string;
};

const ScenarioDetailsView: FC<ScenarioDetailsViewProps> = ({ details, scenarioName }) => {
  const { loading, getScenarioDetails } = useScenarios();

  useEffect(() => {
    scenarioName && getScenarioDetails(scenarioName);
  }, [scenarioName]);

  return (
    <WidgetView flat loading={loading.getScenarioDetails}>
      <WidgetInfoRowsView containerSx={{ mt: 0 }}>
        <BaseInfoRowView name={'Name'} value={details.name} />
        <BaseInfoRowView name={'File'} value={details.file} />
      </WidgetInfoRowsView>
      {details.ratioTotal.length > 0 && <RatioResultsTreeView title={'Total ratio'} results={details.ratioTotal} />}
      {details.ratioPerClass.length > 0 && (
        <RatioResultsTreeView title={'Ratio per class'} results={details.ratioPerClass} />
      )}
    </WidgetView>
  );
};

const getState = (state: ReduxState) => ({
  details: state.scenarios.scenarioDetails
});
export default connect(getState)(ScenarioDetailsView);
