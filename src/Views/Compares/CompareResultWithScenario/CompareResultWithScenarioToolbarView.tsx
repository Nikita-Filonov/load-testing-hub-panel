import { BaseToolbarView } from '../../../Components/Toolbar/BaseToolbarView';
import { useLoadTestResultDetailsToolbarActions } from '../../../Services/Results/Hooks';
import { connect } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { CompareResultWithScenario } from '../../../Models/Compares/CompareResultWithScenario';
import { FC } from 'react';

type CompareResultWithScenarioToolbarViewProps = {
  compare: CompareResultWithScenario;
};

const CompareResultWithScenarioToolbarView: FC<CompareResultWithScenarioToolbarViewProps> = ({ compare }) => {
  const actions = useLoadTestResultDetailsToolbarActions();

  return <BaseToolbarView title={`Comparison with scenario ${compare.scenario.name}`} actions={actions} />;
};

const getState = (state: ReduxState) => ({ compare: state.compares.compareResultWithScenario });
export default connect(getState)(CompareResultWithScenarioToolbarView);
