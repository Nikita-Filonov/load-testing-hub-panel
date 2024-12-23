import { BaseToolbarView } from '../../../Components/Toolbar/BaseToolbarView';
import { useLoadTestResultDetailsToolbarActions } from '../../../Services/Results/Hooks';
import { connect } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { CompareResultWithScenario } from '../../../Models/Compares/CompareResultWithScenario';
import { FC, Fragment, useState } from 'react';
import UpdateScenarioSettingsModal from '../../../Components/Modals/Scenarios/UpdateScenarioSettingsModal';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { ScenarioSettingsProvider } from '../../../Providers/Services/ScenarioSettingsProvider';

type CompareResultWithScenarioToolbarViewProps = {
  compare: CompareResultWithScenario;
};

const CompareResultWithScenarioToolbarView: FC<CompareResultWithScenarioToolbarViewProps> = ({ compare }) => {
  const actions = useLoadTestResultDetailsToolbarActions();
  const [scenarioSettingsModal, setScenarioSettingsModal] = useState(false);

  const onScenarioSettings = () => setScenarioSettingsModal(true);

  return (
    <Fragment>
      <BaseToolbarView
        title={`Comparison with scenario ${compare.scenario.name}`}
        actions={[...actions, { icon: <SettingsOutlinedIcon />, onClick: onScenarioSettings }]}
      />
      <ScenarioSettingsProvider>
        <UpdateScenarioSettingsModal
          modal={scenarioSettingsModal}
          setModal={setScenarioSettingsModal}
          scenarioId={compare.scenario.id}
        />
      </ScenarioSettingsProvider>
    </Fragment>
  );
};

const getState = (state: ReduxState) => ({ compare: state.compares.compareResultWithScenario });
export default connect(getState)(CompareResultWithScenarioToolbarView);
