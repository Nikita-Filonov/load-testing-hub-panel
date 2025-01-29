import { FC, Fragment, useState } from 'react';
import { BaseMenu } from '../../BaseMenu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { LoadTestResult } from '../../../../Models/Results/LoadTestResults';
import { OpenTriggerPipelineMenuItem } from '../../../MenuItems/Results/LoadTestsResults/OpenTriggerPipelineMenuItem';
import { OpenLoadTestsPipelineMenuItem } from '../../../MenuItems/Results/LoadTestsResults/OpenLoadTestsPipelineMenuItem';
import { ViewDetailsMenuItem } from '../../../MenuItems/ViewDetailsMenuItem';
import { DeleteMenuItem } from '../../../MenuItems/DeleteMenuItem';
import { DeleteLoadTestResultModal } from '../../../Modals/Results/LoadTestsResults/DeleteLoadTestResultModal';
import { CopyDetailsURLMenuItem } from '../../../MenuItems/CopyDetailsURLMenuItem';
import { OpenTriggerJobMenuItem } from '../../../MenuItems/Results/LoadTestsResults/OpenTriggerJobMenuItem';
import { OpenLoadTestJobMenuItem } from '../../../MenuItems/Results/LoadTestsResults/OpenLoadTestJobMenuItem';
import { useLoadTestResultsNavigation } from '../../../../Services/Results/Hooks';
import { ViewScenarioDetailsMenuItem } from '../../../MenuItems/ViewScenarioDetailsMenuItem';
import { SetCommentMenuItem } from '../../../MenuItems/SetCommentMenuItem';

type LoadTestResultViewMenuProps = {
  result: LoadTestResult;
  onSetComment: (result: LoadTestResult) => void;
  onScenarioDetails: (result: LoadTestResult) => void;
};

export const LoadTestResultViewMenu: FC<LoadTestResultViewMenuProps> = (props) => {
  const { result, onSetComment, onScenarioDetails } = props;
  const { getLoadTestResultDetailsURL, navigateResultDetails } = useLoadTestResultsNavigation();
  const [menu, setMenu] = useState<null | HTMLElement>(null);
  const [deleteLoadTestResultModal, setDeleteLoadTestResultModal] = useState(false);

  const onClose = () => setMenu(null);

  const onViewDetails = () => {
    onClose();
    navigateResultDetails(result.id);
  };

  const onCopyDetailsURL = async () => {
    onClose();
    await navigator.clipboard.writeText(getLoadTestResultDetailsURL(result.id));
  };

  const onViewScenario = () => {
    onClose();
    onScenarioDetails(result);
  };

  const onComment = () => {
    onClose();
    onSetComment(result);
  };

  const onDelete = () => {
    onClose();
    setDeleteLoadTestResultModal(true);
  };

  return (
    <Fragment>
      <BaseMenu menu={menu} setMenu={setMenu} icon={<MoreVertIcon fontSize={'small'} />} buttonSize={'small'}>
        <ViewDetailsMenuItem onDetails={onViewDetails} />
        <CopyDetailsURLMenuItem onCopy={onCopyDetailsURL} />
        <ViewScenarioDetailsMenuItem onDetails={onViewScenario} />
        <SetCommentMenuItem onComment={onComment} />
        <OpenTriggerJobMenuItem result={result} onClose={onClose} />
        <OpenLoadTestJobMenuItem result={result} onClose={onClose} />
        <OpenTriggerPipelineMenuItem result={result} onClose={onClose} />
        <OpenLoadTestsPipelineMenuItem result={result} onClose={onClose} />
        <DeleteMenuItem onDelete={onDelete} />
      </BaseMenu>
      <DeleteLoadTestResultModal
        modal={deleteLoadTestResultModal}
        setModal={setDeleteLoadTestResultModal}
        loadTestResultId={result.id}
      />
    </Fragment>
  );
};
