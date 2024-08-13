import React, { FC, PropsWithChildren, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { MethodResultsHTTPClient } from '../../Services/Clients/Results/MethodResultsHTTPClient';
import {
  GetMethodResultsComparesQuery,
  GetMethodResultsQuery,
  GetMethodResultsScenarioComparesQuery
} from '../../Models/Results/MethodResults';
import {
  setMethodResults,
  setMethodResultScenarioCompares,
  setMethodResultsCompares
} from '../../Redux/Results/MethodResults/MethodResultsSlice';

interface Loading {
  getMethodResults: boolean;
  getMethodResultsCompares: boolean;
  getMethodResultsScenarioCompares: boolean;
}

export type MethodResultsContextProps = {
  loading: Loading;
  getMethodResults: (query: GetMethodResultsQuery) => Promise<void>;
  getMethodResultsCompares: (query: GetMethodResultsComparesQuery) => Promise<void>;
  getMethodResultsScenarioCompares: (query: GetMethodResultsScenarioComparesQuery) => Promise<void>;
};

const MethodResultsContext = React.createContext<MethodResultsContextProps | null>(null);

const MethodResultsProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();
  const methodResultsHTTPClient = new MethodResultsHTTPClient();
  const [loading, setLoading] = useState<Loading>({
    getMethodResults: false,
    getMethodResultsCompares: false,
    getMethodResultsScenarioCompares: false
  });

  const getMethodResultsAPI = async (query: GetMethodResultsQuery) => {
    setLoading({ ...loading, getMethodResults: true });
    const response = await methodResultsHTTPClient.getMethodResults(query);
    response && dispatch(setMethodResults(response.results));
    setLoading({ ...loading, getMethodResults: false });
  };

  const getMethodResultsComparesAPI = async (query: GetMethodResultsComparesQuery) => {
    setLoading({ ...loading, getMethodResultsCompares: true });
    const response = await methodResultsHTTPClient.getMethodResultsCompares(query);
    response && dispatch(setMethodResultsCompares(response.compares));
    setLoading({ ...loading, getMethodResultsCompares: false });
  };

  const getMethodResultsScenarioComparesAPI = async (query: GetMethodResultsScenarioComparesQuery) => {
    setLoading({ ...loading, getMethodResultsScenarioCompares: true });
    const response = await methodResultsHTTPClient.getMethodResultsScenarioCompares(query);
    response && dispatch(setMethodResultScenarioCompares(response.compares));
    setLoading({ ...loading, getMethodResultsScenarioCompares: false });
  };

  return (
    <MethodResultsContext.Provider
      value={{
        loading,
        getMethodResults: getMethodResultsAPI,
        getMethodResultsCompares: getMethodResultsComparesAPI,
        getMethodResultsScenarioCompares: getMethodResultsScenarioComparesAPI
      }}>
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
