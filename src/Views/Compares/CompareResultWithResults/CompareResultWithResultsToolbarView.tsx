import { BaseToolbarView } from '../../../Components/Toolbar/BaseToolbarView';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { FC, Fragment, useState } from 'react';
import SelectLoadTestResultsModal from '../../../Components/Modals/Results/SelectLoadTestResultsModal';
import { LoadTestResultsProvider } from '../../../Providers/Results/LoadTestResultsProvider';
import { useLoadTestResultDetailsToolbarActions } from '../../../Services/Results/Hooks';

type CompareResultWithResultsToolbarViewProps = {
  compareWithLoadTestResults: number[];
  setCompareWithLoadTestResults: (results: number[]) => void;
};

export const CompareResultWithResultsToolbarView: FC<CompareResultWithResultsToolbarViewProps> = (props) => {
  const { compareWithLoadTestResults, setCompareWithLoadTestResults } = props;
  const actions = useLoadTestResultDetailsToolbarActions();
  const [selectLoadTestResultsModal, setSelectLoadTestResultsModal] = useState(false);

  const onSelectLoadTestResults = () => setSelectLoadTestResultsModal(true);

  return (
    <Fragment>
      <BaseToolbarView
        title={'Comparison with results'}
        actions={[
          ...actions,
          {
            icon: <FormatListBulletedIcon />,
            onClick: onSelectLoadTestResults,
            badgeContent: compareWithLoadTestResults.length
          }
        ]}
      />
      <LoadTestResultsProvider>
        <SelectLoadTestResultsModal
          modal={selectLoadTestResultsModal}
          setModal={setSelectLoadTestResultsModal}
          selectedLoadTestResults={compareWithLoadTestResults}
          onSelectLoadTestResults={setCompareWithLoadTestResults}
        />
      </LoadTestResultsProvider>
    </Fragment>
  );
};
