import React, { FC, PropsWithChildren, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  GetLoadTestResultDetailsQuery,
  GetLoadTestResultsQuery,
  UpdateLoadTestResultQuery,
  UpdateLoadTestResultRequest
} from '../../Models/Results/LoadTestResults';
import {
  deleteLoadTestResult,
  setLoadTestResultDetails,
  setLoadTestResults,
  setLoadTestResultsTotal,
  updateLoadTestResult
} from '../../Redux/Results/LoadTestResults/LoadTestResultsSlice';
import { LoadTestResultsHTTPClient } from '../../Services/Clients/Results/LoadTestResultsHTTPClient';

interface Loading {
  getLoadTestResults: boolean;
  updateLoadTestResult: boolean;
  deleteLoadTestResult: boolean;
  getLoadTestResultDetails: boolean;
}

export type LoadTestResultsContextProps = {
  loading: Loading;
  getLoadTestResults: (query: GetLoadTestResultsQuery) => Promise<void>;
  updateLoadTestResult: (
    loadTestResultId: number,
    query: UpdateLoadTestResultQuery,
    request: UpdateLoadTestResultRequest
  ) => Promise<boolean>;
  deleteLoadTestResult: (loadTestResultId: number) => Promise<boolean>;
  getLoadTestResultDetails: (loadTestResultId: number, query: GetLoadTestResultDetailsQuery) => Promise<void>;
};

const LoadTestResultsContext = React.createContext<LoadTestResultsContextProps | null>(null);

const LoadTestResultsProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();
  const loadTestResultsHTTPClient = new LoadTestResultsHTTPClient();
  const [loading, setLoading] = useState<Loading>({
    getLoadTestResults: false,
    updateLoadTestResult: false,
    deleteLoadTestResult: false,
    getLoadTestResultDetails: false
  });

  const getLoadTestResultsAPI = async (query: GetLoadTestResultsQuery) => {
    setLoading({ ...loading, getLoadTestResults: true });
    const response = await loadTestResultsHTTPClient.getLoadTestResults(query);

    if (response) {
      dispatch(setLoadTestResults(response.items));
      dispatch(setLoadTestResultsTotal(response.total));
    }

    setLoading({ ...loading, getLoadTestResults: false });
  };

  const updateLoadTestResultAPI = async (
    loadTestResultId: number,
    query: UpdateLoadTestResultQuery,
    request: UpdateLoadTestResultRequest
  ) => {
    setLoading({ ...loading, updateLoadTestResult: true });
    const response = await loadTestResultsHTTPClient.updateLoadTestResult(loadTestResultId, query, request);

    if (response) {
      dispatch(updateLoadTestResult(response.details));
      dispatch(setLoadTestResultDetails(response.details));
    }

    setLoading({ ...loading, updateLoadTestResult: false });
    return Boolean(!response);
  };

  const deleteLoadTestResultAPI = async (loadTestResultId: number) => {
    setLoading({ ...loading, deleteLoadTestResult: true });
    const error = await loadTestResultsHTTPClient.deleteLoadTestResult(loadTestResultId);
    !error && dispatch(deleteLoadTestResult({ loadTestResultId }));
    setLoading({ ...loading, deleteLoadTestResult: false });

    return error;
  };

  const getLoadTestResultDetailsAPI = async (loadTestResultId: number, query: GetLoadTestResultDetailsQuery) => {
    setLoading({ ...loading, getLoadTestResultDetails: true });
    const response = await loadTestResultsHTTPClient.getLoadTestResultDetails(loadTestResultId, query);
    response && dispatch(setLoadTestResultDetails(response.details));
    setLoading({ ...loading, getLoadTestResultDetails: false });
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
