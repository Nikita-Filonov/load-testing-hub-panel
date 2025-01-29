import React, { FC, PropsWithChildren, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { MethodResultsHTTPClient } from '../../Services/Clients/Results/MethodResultsHTTPClient';
import {
  GetMethodResultDetailsQuery,
  GetMethodResultDetailsResponse,
  GetMethodResultsQuery,
  GetMethodResultsResponse
} from '../../Models/Results/MethodResults';
import { setMethodResultDetails, setMethodResults } from '../../Redux/Results/MethodResults/Slice';
import { useAPIResponseHandler } from '../../Services/Clients/Hooks';
import { APIResponse } from '../../Services/Clients/Models';

interface Loading {
  getMethodResults: boolean;
  getMethodResultDetails: boolean;
}

export type MethodResultsContextProps = {
  loading: Loading;
  getMethodResults: (query: GetMethodResultsQuery) => Promise<APIResponse<GetMethodResultsResponse>>;
  getMethodResultDetails: (
    methodResultId: number,
    query: GetMethodResultDetailsQuery
  ) => Promise<APIResponse<GetMethodResultDetailsResponse>>;
};

const MethodResultsContext = React.createContext<MethodResultsContextProps | null>(null);

const MethodResultsProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();
  const { loading, handleAPIResponse } = useAPIResponseHandler({
    provider: MethodResultsProvider.name,
    defaultLoading: {
      getMethodResults: false,
      getMethodResultDetails: false
    }
  });
  const methodResultsHTTPClient = new MethodResultsHTTPClient();

  const getMethodResultsAPI = async (query: GetMethodResultsQuery) => {
    return await handleAPIResponse({
      key: 'getMethodResults',
      call: methodResultsHTTPClient.getMethodResults(query),
      handler: (response) => dispatch(setMethodResults(response.results))
    });
  };

  const getMethodResultDetailsAPI = async (methodResultId: number, query: GetMethodResultDetailsQuery) => {
    return await handleAPIResponse({
      key: 'getMethodResultDetails',
      call: methodResultsHTTPClient.getMethodResultDetails(methodResultId, query),
      handler: (response) => dispatch(setMethodResultDetails(response.details))
    });
  };

  return (
    <MethodResultsContext.Provider
      value={{ loading, getMethodResults: getMethodResultsAPI, getMethodResultDetails: getMethodResultDetailsAPI }}>
      {children}
    </MethodResultsContext.Provider>
  );
};

const useMethodResults = () => {
  const event = useContext(MethodResultsContext);
  if (event == null) {
    throw new Error('useMethodResults() called outside of a MethodResultsProvider?');
  }
  return event;
};

export { MethodResultsProvider, useMethodResults };
