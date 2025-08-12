import { BaseModal } from '../BaseModal';
import { FC } from 'react';
import { CompareMethodResultsHistoryChartsView } from '../../../Views/Compares/CompareMethodResultsHistory/CompareMethodResultsHistoryChartsView';
import { CompareWidgetType } from '../../../Models/Compares/CompareTableSettings';
import { MethodResultCompareView } from '../../../Views/Compares/MethodResultCompareView';
import { MethodResultCompare } from '../../../Models/Compares/Compares';
import { getMethodLabel } from '../../../Services/Methods/Utils';

type Props = {
  modal: boolean;
  setModal: (modal: boolean) => void;
  compare: MethodResultCompare;
  widgetType: CompareWidgetType;
  loadTestResultId: number;
  compareWithLoadTestResults: number[];
};

export const CompareMethodResultsHistoryChartsModal: FC<Props> = (props) => {
  const { modal, setModal, compare, widgetType, loadTestResultId, compareWithLoadTestResults } = props;

  return (
    <BaseModal title={'Comparison charts'} modal={modal} setModal={setModal} maxWidth={'lg'}>
      <MethodResultCompareView
        sx={{ mt: 0 }}
        title={`Comparison of ${getMethodLabel(compare)} method values`}
        loading={false}
        compare={compare}
        widgetType={widgetType}
      />
      <CompareMethodResultsHistoryChartsView
        method={compare.method}
        protocol={compare.protocol}
        loadTestResultId={loadTestResultId}
        compareWithLoadTestResults={compareWithLoadTestResults}
      />
    </BaseModal>
  );
};
