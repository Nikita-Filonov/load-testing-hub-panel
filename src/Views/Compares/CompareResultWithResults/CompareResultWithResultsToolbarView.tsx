import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { FC, Fragment, useState } from 'react';
import SelectLoadTestResultsModal from '../../../Components/Modals/Results/LoadTestsResults/SelectLoadTestResultsModal';
import { LoadTestResultsProvider } from '../../../Providers/Results/LoadTestResultsProvider';
import BaseLoadTestResultDetailsToolbarView from '../../Results/LoadTestResults/BaseLoadTestResultDetailsToolbarView';

type CompareResultWithResultsToolbarViewProps = {
  compareWithLoadTestResults: number[];
  setCompareWithLoadTestResults: (results: number[]) => void;
};

export const CompareResultWithResultsToolbarView: FC<CompareResultWithResultsToolbarViewProps> = (props) => {
  const { compareWithLoadTestResults, setCompareWithLoadTestResults } = props;
  const [selectLoadTestResultsModal, setSelectLoadTestResultsModal] = useState(false);

  const onSelectLoadTestResults = () => setSelectLoadTestResultsModal(true);

  return (
    <Fragment>
      <BaseLoadTestResultDetailsToolbarView
        title={'Comparison with results'}
        actions={[
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
