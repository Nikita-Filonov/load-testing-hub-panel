import { connect } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { ExceptionResultDetails } from '../../../Models/Results/ExceptionResults';
import { FC, useEffect } from 'react';
import { WidgetInfoRowsView } from '../../../Components/Views/WidgetInfoRowsView';
import { BaseInfoRowView } from '../../../Components/Views/BaseInfoRowView';
import { WidgetView } from '../../../Components/Views/WidgetView';
import { useExceptionResults } from '../../../Providers/Results/ExceptionResultsProvider';
import { CodeView } from '../../../Components/Views/CodeView';

type ExceptionResultDetailsViewProps = {
  details: ExceptionResultDetails;
  exceptionResultId: number;
};

const ExceptionResultDetailsView: FC<ExceptionResultDetailsViewProps> = (props) => {
  const { details, exceptionResultId } = props;
  const { loading, getExceptionResultDetails } = useExceptionResults();

  useEffect(() => {
    if (exceptionResultId) {
      getExceptionResultDetails(exceptionResultId);
    }
  }, [exceptionResultId]);

  return (
    <WidgetView flat loading={loading.getExceptionResultDetails}>
      <WidgetInfoRowsView containerSx={{ mt: 0 }}>
        <BaseInfoRowView name={'Number of exceptions'} value={details.numberOfExceptions} />
        <CodeView title={'Message'} content={details.message} />
        <CodeView title={'Details'} content={details.details} />
      </WidgetInfoRowsView>
    </WidgetView>
  );
};

const getState = (state: ReduxState) => ({
  details: state.exceptionResults.exceptionResultDetails
});
export default connect(getState)(ExceptionResultDetailsView);
