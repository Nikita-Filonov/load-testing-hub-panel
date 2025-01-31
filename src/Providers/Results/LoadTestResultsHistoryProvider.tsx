import React, { FC, PropsWithChildren, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { setLoadTestResultsHistory } from '../../Redux/Results/LoadTestResultsHistory/Slice';
import { LoadTestResultsHistoryHTTPClient } from '../../Services/Clients/Results/LoadTestResultsHistoryHTTPClient';
import { GetLoadTestResultsHistoryQuery } from '../../Models/Results/LoadTestResultsHistory';
import { useAPIResponseHandler } from '../../Services/Clients/Hooks';
import { APIResponse } from '../../Services/Clients/Models';
import { GetResultsHistoryResponse } from '../../Models/Results/ResultsHistory';

interface Loading {
  getLoadTestResultsHistory: boolean;
}

export type LoadTestResultsHistoryContextProps = {
  loading: Loading;
  getLoadTestResultsHistory: (query: GetLoadTestResultsHistoryQuery) => Promise<APIResponse<GetResultsHistoryResponse>>;
};

const LoadTestResultsHistoryContext = React.createContext<LoadTestResultsHistoryContextProps | null>(null);

const LoadTestResultsHistoryProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();
  const { loading, handleAPIResponse } = useAPIResponseHandler({
    provider: 'LoadTestResultsHistoryProvider',
    defaultLoading: { getLoadTestResultsHistory: false }
  });
  const loadTestResultsHistoryHTTPClient = new LoadTestResultsHistoryHTTPClient();

  const getLoadTestResultsHistoryAPI = async (query: GetLoadTestResultsHistoryQuery) => {
    return await handleAPIResponse({
      key: 'getLoadTestResultsHistory',
      call: loadTestResultsHistoryHTTPClient.getLoadTestResultsHistory(query),
      handler: (response) => dispatch(setLoadTestResultsHistory(response.results))
    });
  };

  return (
    <LoadTestResultsHistoryContext.Provider
      value={{ loading, getLoadTestResultsHistory: getLoadTestResultsHistoryAPI }}>
      {children}
    </LoadTestResultsHistoryContext.Provider>
  );
};

const useLoadTestResultsHistory = () => {
  const event = useContext(LoadTestResultsHistoryContext);
  if (event == null) {
    throw new Error('useLoadTestResultsHistory() called outside of a LoadTestResultsHistoryProvider?');
  }
  return event;
};

export { LoadTestResultsHistoryProvider, useLoadTestResultsHistory };
