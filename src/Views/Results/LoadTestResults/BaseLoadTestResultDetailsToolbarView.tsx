import { BaseToolbarView, ToolbarAction } from '../../../Components/Toolbar/BaseToolbarView';
import { FC, Fragment, useState } from 'react';
import { LoadTestResultDetails } from '../../../Models/Results/LoadTestResults';
import { connect } from 'react-redux';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import HandymanOutlinedIcon from '@mui/icons-material/HandymanOutlined';
import { ReduxState } from '../../../Redux/ReduxState';
import SetLoadTestResultCommentModal from '../../../Components/Modals/Results/LoadTestsResults/SetLoadTestResultCommentModal';
import { LoadTestResultsProvider } from '../../../Providers/Results/LoadTestResultsProvider';
import { ScenariosProvider } from '../../../Providers/Services/ScenariosProvider';
import { ScenarioDetailsModal } from '../../../Components/Modals/Scenarios/ScenarioDetailsModal';
import { LoadTestsResultsTriggersMenu } from '../../../Components/Menus/Results/LoadTestsResults/LoadTestsResultsTriggersMenu';
import { IntegrationsProvider } from '../../../Providers/Integrations/IntegrationsProvider';
import IntegrationsMenu from '../../../Components/Menus/Integrations/IntegrationsMenu';

type BaseLoadTestResultDetailsToolbarViewProps = {
  title: string;
  actions: ToolbarAction[];
  details: LoadTestResultDetails;
};

const BaseLoadTestResultDetailsToolbarView: FC<BaseLoadTestResultDetailsToolbarViewProps> = (props) => {
  const { title, actions, details } = props;
  const [scenarioDetailsModal, setScenarioDetailsModal] = useState(false);
  const [loadTestResultCommentModal, setLoadTestResultCommentModal] = useState(false);

  const onScenarioDetails = () => setScenarioDetailsModal(true);

  const onLoadTestResultComment = () => setLoadTestResultCommentModal(true);

  return (
    <Fragment>
      <BaseToolbarView
        title={title}
        actions={[
          { icon: <CommentOutlinedIcon />, onClick: onLoadTestResultComment },
          { icon: <HandymanOutlinedIcon />, onClick: onScenarioDetails },
          {
            content: (
              <IntegrationsProvider>
                <IntegrationsMenu loadTestResultId={details.id} />
              </IntegrationsProvider>
            )
          },
          { content: <LoadTestsResultsTriggersMenu details={details} /> },
          ...actions
        ]}
      />
      <ScenariosProvider>
        <ScenarioDetailsModal
          modal={scenarioDetailsModal}
          setModal={setScenarioDetailsModal}
          scenarioId={details.scenario.id}
        />
      </ScenariosProvider>
      <LoadTestResultsProvider>
        <SetLoadTestResultCommentModal
          modal={loadTestResultCommentModal}
          setModal={setLoadTestResultCommentModal}
          loadTestResultId={details.id}
        />
      </LoadTestResultsProvider>
    </Fragment>
  );
};

const getState = (state: ReduxState) => ({
  details: state.loadTestResults.loadTestResultDetails
});
export default connect(getState)(BaseLoadTestResultDetailsToolbarView);
