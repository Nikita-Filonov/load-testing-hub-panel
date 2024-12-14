import { connect } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { BaseModal } from '../BaseModal';
import { FC, useEffect, useState } from 'react';
import { LoadTestResultDetails, UpdateLoadTestResultRequest } from '../../../Models/Results/LoadTestResults';
import { useLoadTestResults } from '../../../Providers/Results/LoadTestResultsProvider';
import { SetLoadTestResultCommentForm } from '../../Forms/Results/LoadTestResults/SetLoadTestResultCommentForm';
import { Scenario } from '../../../Models/Services/Scenarios';

type SetLoadTestResultCommentModalProps = {
  modal: boolean;
  setModal: (modal: boolean) => void;
  details: LoadTestResultDetails;
  scenario: Scenario;
};

const SetLoadTestResultCommentModal: FC<SetLoadTestResultCommentModalProps> = (props) => {
  const { modal, setModal, details, scenario } = props;
  const { loading, updateLoadTestResult } = useLoadTestResults();
  const [request, setRequest] = useState<UpdateLoadTestResultRequest>({
    comment: details.comment
  });

  useEffect(() => {
    modal && setRequest({ comment: details.comment });
  }, [modal, details.comment]);

  const onClose = () => setModal(false);

  const onSetComment = async () => {
    const error = await updateLoadTestResult(details.id, { scenarioId: scenario.id }, request);
    !error && onClose();
  };

  return (
    <BaseModal
      title={'Set load test result comment'}
      modal={modal}
      setModal={setModal}
      onConfirm={onSetComment}
      confirmLoading={loading.updateLoadTestResult}>
      <SetLoadTestResultCommentForm request={request} setRequest={setRequest} />
    </BaseModal>
  );
};

const getState = (state: ReduxState) => ({
  details: state.loadTestResults.loadTestResultDetails,
  scenario: state.scenarios.scenario
});
export default connect(getState)(SetLoadTestResultCommentModal);
