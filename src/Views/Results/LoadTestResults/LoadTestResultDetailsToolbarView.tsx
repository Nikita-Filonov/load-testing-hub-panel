import { BaseToolbarView } from '../../../Components/Toolbar/BaseToolbarView';
import { FC, Fragment, useState } from 'react';
import { LoadTestResultDetails } from '../../../Models/Results/LoadTestResults';
import { connect } from 'react-redux';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import { ReduxState } from '../../../Redux/ReduxState';
import { LoadTestsResultsCompareMenu } from '../../../Components/Menus/Results/LoadTestsResults/LoadTestsResultsCompareMenu';
import SetLoadTestResultCommentModal from '../../../Components/Modals/Results/SetLoadTestResultCommentModal';
import { LoadTestResultsProvider } from '../../../Providers/Results/LoadTestResultsProvider';
import { useLoadTestResultDetailsToolbarActions } from '../../../Services/Results/Hooks';

type LoadTestResultDetailsToolbarViewProps = {
  details: LoadTestResultDetails;
};

const LoadTestResultDetailsToolbarView: FC<LoadTestResultDetailsToolbarViewProps> = (props) => {
  const { details } = props;
  const actions = useLoadTestResultDetailsToolbarActions();
  const [loadTestResultCommentModal, setLoadTestResultCommentModal] = useState(false);

  const onLoadTestResultComment = () => setLoadTestResultCommentModal(true);

  return (
    <Fragment>
      <BaseToolbarView
        title={'Load tests result details'}
        actions={[
          { icon: <CommentOutlinedIcon />, onClick: onLoadTestResultComment },
          { content: <LoadTestsResultsCompareMenu loadTestResultId={details.id} /> },
          ...actions
        ]}
      />
      <LoadTestResultsProvider>
        <SetLoadTestResultCommentModal modal={loadTestResultCommentModal} setModal={setLoadTestResultCommentModal} />
      </LoadTestResultsProvider>
    </Fragment>
  );
};

const getState = (state: ReduxState) => ({
  details: state.loadTestResults.loadTestResultDetails
});
export default connect(getState)(LoadTestResultDetailsToolbarView);
