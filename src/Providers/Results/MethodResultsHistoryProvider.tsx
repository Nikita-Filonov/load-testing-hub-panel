import React, { FC, PropsWithChildren, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { MethodResultsHistoryHTTPClient } from '../../Services/Clients/Results/MethodResultsHistoryHTTPClient';
import { GetMethodResultsHistoryQuery } from '../../Models/Results/MethodResultsHistory';
import { setMethodResultsHistory } from '../../Redux/Results/MethodResultsHistory/Slice';
import { useAPIResponseHandler } from '../../Services/Clients/Hooks';
import { APIResponse } from '../../Services/Clients/Models';
import { GetResultsHistoryResponse } from '../../Models/Results/ResultsHistory';

interface Loading {
  getMethodResultsHistory: boolean;
}

export type MethodResultsHistoryContextProps = {
  loading: Loading;
  getMethodResultsHistory: (query: GetMethodResultsHistoryQuery) => Promise<APIResponse<GetResultsHistoryResponse>>;
};

const MethodResultsHistoryContext = React.createContext<MethodResultsHistoryContextProps | null>(null);

const MethodResultsHistoryProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();
  const { loading, handleAPIResponse } = useAPIResponseHandler({
    provider: MethodResultsHistoryProvider.name,
    defaultLoading: { getMethodResultsHistory: false }
  });
  const methodResultsHistoryHTTPClient = new MethodResultsHistoryHTTPClient();

  const getMethodResultsHistoryAPI = async (query: GetMethodResultsHistoryQuery) => {
    return await handleAPIResponse({
      key: 'getMethodResultsHistory',
      call: methodResultsHistoryHTTPClient.getMethodResultsHistory(query),
      handler: (response) => dispatch(setMethodResultsHistory(response.results))
    });
  };

  return (
    <MethodResultsHistoryContext.Provider value={{ loading, getMethodResultsHistory: getMethodResultsHistoryAPI }}>
      {children}
    </MethodResultsHistoryContext.Provider>
  );
};

const useMethodResultsHistory = () => {
  const event = useContext(MethodResultsHistoryContext);
  if (event == null) {
    throw new Error('useMethodResultsHistory() called outside of a MethodResultsHistoryProvider?');
  }
  return event;
};

export { MethodResultsHistoryProvider, useMethodResultsHistory };
