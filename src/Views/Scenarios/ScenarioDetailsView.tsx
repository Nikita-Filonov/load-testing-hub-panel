import { WidgetInfoRowsView } from '../../Components/Views/WidgetInfoRowsView';
import { BaseInfoRowView } from '../../Components/Views/BaseInfoRowView';
import { useScenarios } from '../../Providers/Services/ScenariosProvider';
import { FC, Fragment, PropsWithChildren, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ReduxState } from '../../Redux/ReduxState';
import { ScenarioDetails } from '../../Models/Services/Scenarios';
import { RatioResultsTreeView } from '../../Components/TreeView/Results/RatioResults/RatioResultsTreeView';
import { BoxView } from '../../Components/Views/BoxView';
import { ScenarioTagsLabel } from '../../Components/Labels/Scenarios/ScenarioTagsLabel';
import { ScenarioVersionLabel } from '../../Components/Labels/Scenarios/ScenarioVersionLabel';
import { WidgetView } from '../../Components/Views/WidgetView';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import UpdateScenarioSettingsModal from '../../Components/Modals/Scenarios/UpdateScenarioSettingsModal';
import { ScenarioSettingsProvider } from '../../Providers/Services/ScenarioSettingsProvider';

type ScenarioDetailsViewProps = {
  widget?: boolean;
  details: ScenarioDetails;
  scenarioId: number;
};

type ContainerProps = {
  widget?: boolean;
  loading: boolean;
  scenarioId: number;
} & PropsWithChildren;

const Container: FC<ContainerProps> = ({ widget, loading, children, scenarioId }) => {
  const [scenarioSettingsModal, setScenarioSettingsModal] = useState(false);

  const onScenarioSettings = () => setScenarioSettingsModal(true);

  return (
    <Fragment>
      {widget ? (
        <WidgetView
          sx={{ mt: 3 }}
          title={'Scenario details'}
          loading={loading}
          actions={[{ icon: <SettingsOutlinedIcon fontSize={'small'} />, onClick: onScenarioSettings }]}
          allowClose>
          {children}
        </WidgetView>
      ) : (
        <BoxView loading={loading} containerSx={{ mt: 0 }}>
          {children}
        </BoxView>
      )}
      <ScenarioSettingsProvider>
        <UpdateScenarioSettingsModal
          modal={scenarioSettingsModal}
          setModal={setScenarioSettingsModal}
          scenarioId={scenarioId}
        />
      </ScenarioSettingsProvider>
    </Fragment>
  );
};

const ScenarioDetailsView: FC<ScenarioDetailsViewProps> = ({ widget, details, scenarioId }) => {
  const { loading, getScenarioDetails } = useScenarios();

  useEffect(() => {
    scenarioId && getScenarioDetails(scenarioId);
  }, [scenarioId]);

  return (
    <Container widget={widget} loading={loading.getScenarioDetails} scenarioId={scenarioId}>
      <WidgetInfoRowsView containerSx={widget ? {} : { mt: 0 }}>
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
    </Container>
  );
};

const getState = (state: ReduxState) => ({
  details: state.scenarios.scenarioDetails
});
export default connect(getState)(ScenarioDetailsView);
