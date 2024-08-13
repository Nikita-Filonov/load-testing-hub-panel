import React, { FC, PropsWithChildren, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  GetLoadTestResultDetailsQuery,
  GetLoadTestResultScenarioCompareQuery,
  GetLoadTestResultsQuery
} from '../../Models/Results/LoadTestResults';
import {
  setLoadTestResultDetails,
  setLoadTestResults,
  setLoadTestResultScenarioCompare,
  setLoadTestResultsTotal
} from '../../Redux/Results/LoadTestResults/LoadTestResultsSlice';
import { LoadTestResultsHTTPClient } from '../../Services/Clients/Results/LoadTestResultsHTTPClient';

interface Loading {
  getLoadTestResults: boolean;
  getLoadTestResultDetails: boolean;
  getLoadTestResultScenarioCompare: boolean;
}

export type LoadTestResultsContextProps = {
  loading: Loading;
  getLoadTestResults: (query: GetLoadTestResultsQuery) => Promise<void>;
  getLoadTestResultDetails: (query: GetLoadTestResultDetailsQuery) => Promise<void>;
  getLoadTestResultScenarioCompare: (query: GetLoadTestResultScenarioCompareQuery) => Promise<void>;
};

const LoadTestResultsContext = React.createContext<LoadTestResultsContextProps | null>(null);

const LoadTestResultsProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();
  const loadTestResultsHTTPClient = new LoadTestResultsHTTPClient();
  const [loading, setLoading] = useState<Loading>({
    getLoadTestResults: false,
    getLoadTestResultDetails: false,
    getLoadTestResultScenarioCompare: false
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

  const getLoadTestResultDetailsAPI = async (query: GetLoadTestResultDetailsQuery) => {
    setLoading({ ...loading, getLoadTestResultDetails: true });
    const response = await loadTestResultsHTTPClient.getLoadTestResultDetails(query);
    response && dispatch(setLoadTestResultDetails(response.details));
    setLoading({ ...loading, getLoadTestResultDetails: false });
  };

  const getLoadTestResultScenarioCompareAPI = async (query: GetLoadTestResultScenarioCompareQuery) => {
    setLoading({ ...loading, getLoadTestResultScenarioCompare: true });
    const response = await loadTestResultsHTTPClient.getLoadTestResultScenarioCompare(query);
    response && dispatch(setLoadTestResultScenarioCompare(response.compare));
    setLoading({ ...loading, getLoadTestResultScenarioCompare: false });
  };

  return (
    <LoadTestResultsContext.Provider
      value={{
        loading,
        getLoadTestResults: getLoadTestResultsAPI,
        getLoadTestResultDetails: getLoadTestResultDetailsAPI,
        getLoadTestResultScenarioCompare: getLoadTestResultScenarioCompareAPI
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
