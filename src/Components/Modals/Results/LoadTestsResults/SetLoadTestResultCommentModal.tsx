import { connect } from 'react-redux';
import { ReduxState } from '../../../../Redux/ReduxState';
import { BaseModal } from '../../BaseModal';
import { FC, useEffect, useState } from 'react';
import { LoadTestResultDetails, UpdateLoadTestResultRequest } from '../../../../Models/Results/LoadTestResults';
import { LoadTestResultsErrorKey, useLoadTestResults } from '../../../../Providers/Results/LoadTestResultsProvider';
import { SetLoadTestResultCommentForm } from '../../../Forms/Results/LoadTestResults/SetLoadTestResultCommentForm';
import { Scenario } from '../../../../Models/Services/Scenarios';
import { useValidationErrors } from '../../../../Services/Clients/Hooks';

type SetLoadTestResultCommentModalProps = {
  modal: boolean;
  setModal: (modal: boolean) => void;
  details: LoadTestResultDetails;
  scenario: Scenario;
  loadTestResultId: number;
};

const SetLoadTestResultCommentModal: FC<SetLoadTestResultCommentModalProps> = (props) => {
  const { modal, setModal, details, scenario, loadTestResultId } = props;
  const { loading, updateLoadTestResult, getLoadTestResultDetails } = useLoadTestResults();
  const { validationErrors, clearValidationErrors } = useValidationErrors({
    key: LoadTestResultsErrorKey.UpdateLoadTestResult
  });
  const [request, setRequest] = useState<UpdateLoadTestResultRequest>({
    comment: details.comment
  });

  useEffect(() => {
    if (modal) {
      setRequest(details);
    }
  }, [modal, details]);

  useEffect(() => {
    if (modal) {
      getLoadTestResultDetails(loadTestResultId, { scenarioId: scenario.id });
    }
  }, [modal, scenario.id, loadTestResultId]);

  const onClose = () => {
    setModal(false);
    clearValidationErrors();
  };

  const onSetComment = async () => {
    const result = await updateLoadTestResult(details.id, { scenarioId: scenario.id }, request);
    if (!result.error) {
      onClose();
    }
  };

  return (
    <BaseModal
      title={'Set load test result comment'}
      modal={modal}
      loading={loading.getLoadTestResultDetails}
      setModal={setModal}
      onConfirm={onSetComment}
      confirmLoading={loading.updateLoadTestResult}>
      <SetLoadTestResultCommentForm request={request} setRequest={setRequest} validationErrors={validationErrors} />
    </BaseModal>
  );
};

const getState = (state: ReduxState) => ({
  details: state.loadTestResults.loadTestResultDetails,
  scenario: state.scenarios.scenario
});
export default connect(getState)(SetLoadTestResultCommentModal);
