import { MethodResultsStatisticsTable } from '../../../Components/Tables/MethodResults/MethodResultsStatisticsTable';
import { connect } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { FC, useMemo, useState } from 'react';
import { MethodResult } from '../../../Models/Results/MethodResults';
import { WidgetView } from '../../../Components/Views/WidgetView';
import { SearchView } from '../../../Components/Views/SearchView';
import { TableSettingsMenu } from '../../../Components/Menus/Core/TableSettingsMenu';
import { TableType } from '../../../Models/Core/TableSettings';
import { INITIAL_METHOD_RESULTS } from '../../../Redux/Results/MethodResults/InitialState';
import { MethodResultDetailsModal } from '../../../Components/Modals/Results/MethodResults/MethodResultDetailsModal';

type MethodResultsStatisticsViewProps = {
  results: MethodResult[];
  loading: boolean;
};

const MethodResultsStatisticsView: FC<MethodResultsStatisticsViewProps> = ({ results, loading }) => {
  const [result, setResult] = useState<MethodResult>(INITIAL_METHOD_RESULTS.methodResultDetails);
  const [search, setSearch] = useState('');
  const [methodResultDetailsModal, setMethodResultDetailsModal] = useState(false);

  const filteredResults = useMemo(
    () => results.filter((result) => result.method.toLowerCase().includes(search.toLowerCase())),
    [search, results]
  );

  const onMethodResultDetails = (result: MethodResult) => {
    setResult(result);
    setMethodResultDetailsModal(true);
  };

  return (
    <WidgetView
      sx={{ mt: 3 }}
      title={'Statistics of methods'}
      loading={loading}
      actions={[{ content: <TableSettingsMenu type={TableType.MethodResultsStatisticsTable} /> }]}>
      <SearchView
        value={search}
        onChange={setSearch}
        placeholder={'Search by method name'}
        totalResults={filteredResults.length}
      />
      <MethodResultsStatisticsTable results={filteredResults} onMethodResultDetails={onMethodResultDetails} />
      <MethodResultDetailsModal
        modal={methodResultDetailsModal}
        setModal={setMethodResultDetailsModal}
        methodResultId={result.id}
      />
    </WidgetView>
  );
};

const getState = (state: ReduxState) => ({
  results: state.methodResults.methodResults
});
export default connect(getState)(MethodResultsStatisticsView);
