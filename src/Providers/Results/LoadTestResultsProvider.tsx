import React, { FC, PropsWithChildren, useContext } from 'react';
import { useDispatch } from 'react-redux';
import {
  GetLoadTestResultDetailsQuery,
  GetLoadTestResultDetailsResponse,
  GetLoadTestResultsQuery,
  GetLoadTestResultsResponse,
  UpdateLoadTestResultQuery,
  UpdateLoadTestResultRequest
} from '../../Models/Results/LoadTestResults';
import {
  deleteLoadTestResult,
  setLoadTestResultDetails,
  setLoadTestResults,
  setLoadTestResultsTotal,
  updateLoadTestResult
} from '../../Redux/Results/LoadTestResults/Slice';
import { LoadTestResultsHTTPClient } from '../../Services/Clients/Results/LoadTestResultsHTTPClient';
import { APIResponse } from '../../Services/Clients/Models';
import { useAPIResponseHandler } from '../../Services/Clients/Hooks';

export enum LoadTestResultsErrorKey {
  UpdateLoadTestResult = 'LoadTestResultsProvider/updateLoadTestResult'
}

interface Loading {
  getLoadTestResults: boolean;
  updateLoadTestResult: boolean;
  deleteLoadTestResult: boolean;
  getLoadTestResultDetails: boolean;
}

export type LoadTestResultsContextProps = {
  loading: Loading;
  getLoadTestResults: (query: GetLoadTestResultsQuery) => Promise<APIResponse<GetLoadTestResultsResponse>>;
  updateLoadTestResult: (
    loadTestResultId: number,
    query: UpdateLoadTestResultQuery,
    request: UpdateLoadTestResultRequest
  ) => Promise<APIResponse<GetLoadTestResultDetailsResponse>>;
  deleteLoadTestResult: (loadTestResultId: number) => Promise<APIResponse>;
  getLoadTestResultDetails: (
    loadTestResultId: number,
    query: GetLoadTestResultDetailsQuery
  ) => Promise<APIResponse<GetLoadTestResultDetailsResponse>>;
};

const LoadTestResultsContext = React.createContext<LoadTestResultsContextProps | null>(null);

const LoadTestResultsProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();
  const { loading, handleAPIResponse } = useAPIResponseHandler({
    provider: LoadTestResultsProvider.name,
    defaultLoading: {
      getLoadTestResults: false,
      updateLoadTestResult: false,
      deleteLoadTestResult: false,
      getLoadTestResultDetails: false
    }
  });
  const loadTestResultsHTTPClient = new LoadTestResultsHTTPClient();

  const getLoadTestResultsAPI = async (query: GetLoadTestResultsQuery) => {
    return await handleAPIResponse({
      key: 'getLoadTestResults',
      call: loadTestResultsHTTPClient.getLoadTestResults(query),
      handler: (response) => {
        dispatch(setLoadTestResults(response.items));
        dispatch(setLoadTestResultsTotal(response.total));
      }
    });
  };

  const updateLoadTestResultAPI = async (
    loadTestResultId: number,
    query: UpdateLoadTestResultQuery,
    request: UpdateLoadTestResultRequest
  ) => {
    return await handleAPIResponse({
      key: 'updateLoadTestResult',
      call: loadTestResultsHTTPClient.updateLoadTestResult(loadTestResultId, query, request),
      handler: (response) => {
        dispatch(updateLoadTestResult(response.details));
        dispatch(setLoadTestResultDetails(response.details));
      }
    });
  };

  const deleteLoadTestResultAPI = async (loadTestResultId: number) => {
    return await handleAPIResponse({
      key: 'deleteLoadTestResult',
      call: loadTestResultsHTTPClient.deleteLoadTestResult(loadTestResultId),
      handler: () => dispatch(deleteLoadTestResult({ loadTestResultId }))
    });
  };

  const getLoadTestResultDetailsAPI = async (loadTestResultId: number, query: GetLoadTestResultDetailsQuery) => {
    return await handleAPIResponse({
      key: 'getLoadTestResultDetails',
      call: loadTestResultsHTTPClient.getLoadTestResultDetails(loadTestResultId, query),
      handler: (response) => dispatch(setLoadTestResultDetails(response.details))
    });
  };

  return (
    <LoadTestResultsContext.Provider
      value={{
        loading,
        getLoadTestResults: getLoadTestResultsAPI,
        updateLoadTestResult: updateLoadTestResultAPI,
        deleteLoadTestResult: deleteLoadTestResultAPI,
        getLoadTestResultDetails: getLoadTestResultDetailsAPI
      }}>
      {children}
    </LoadTestResultsContext.Provider>
  );
};

const useLoadTestResults = () => {
  const event = useContext(LoadTestResultsContext);
  if (event == null) {
    throw new Error('useLoadTestResults() called outside of a LoadTestResultsProvider?');
  }
  return event;
};

export { LoadTestResultsProvider, useLoadTestResults };
