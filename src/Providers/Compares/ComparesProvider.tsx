import React, { FC, PropsWithChildren, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ComparesHTTPClient } from '../../Services/Clients/Compares/ComparesHTTPClient';
import { GetCompareResultWithResultsQuery } from '../../Models/Compares/CompareResultWithResults';
import {
  setCompareAveragesWithScenario,
  setCompareHistoryResults,
  setCompareMethodWithScenario,
  setCompareResultWithAverages,
  setCompareResultWithResults,
  setCompareResultWithResultsAverageSummary,
  setCompareResultWithScenario
} from '../../Redux/Compares/Compares/ComparesSlice';
import { GetCompareResultWithAveragesQuery } from '../../Models/Compares/CompareResultWithAverages';
import { GetCompareResultWithScenarioQuery } from '../../Models/Compares/CompareResultWithScenario';
import { GetCompareMethodWithScenarioQuery } from '../../Models/Compares/CompareMethodWithScenario';
import { GetCompareAveragesWithScenarioQuery } from '../../Models/Compares/CompareAveragesWithScenario';

interface Loading {
  getCompareHistoryResults: boolean;
  getCompareResultWithResults: boolean;
  getCompareResultWithAverages: boolean;
  getCompareResultWithScenario: boolean;
  getCompareMethodWithScenario: boolean;
  getCompareAveragesWithScenario: boolean;
}

export type ComparesContextProps = {
  loading: Loading;
  getCompareHistoryResults: (query: GetCompareResultWithResultsQuery) => Promise<void>;
  getCompareResultWithResults: (query: GetCompareResultWithResultsQuery) => Promise<void>;
  getCompareResultWithAverages: (query: GetCompareResultWithAveragesQuery) => Promise<void>;
  getCompareResultWithScenario: (query: GetCompareResultWithScenarioQuery) => Promise<void>;
  getCompareMethodWithScenario: (query: GetCompareMethodWithScenarioQuery) => Promise<void>;
  getCompareAveragesWithScenario: (query: GetCompareAveragesWithScenarioQuery) => Promise<void>;
};

const ComparesContext = React.createContext<ComparesContextProps | null>(null);

const ComparesProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();
  const comparesHTTPClient = new ComparesHTTPClient();
  const [loading, setLoading] = useState<Loading>({
    getCompareHistoryResults: false,
    getCompareResultWithResults: false,
    getCompareResultWithAverages: false,
    getCompareResultWithScenario: false,
    getCompareMethodWithScenario: false,
    getCompareAveragesWithScenario: false
  });

  const getCompareHistoryResultsAPI = async (query: GetCompareResultWithResultsQuery) => {
    setLoading((loading) => ({ ...loading, getCompareHistoryResults: true }));
    const response = await comparesHTTPClient.getCompareHistoryResults(query);
    response && dispatch(setCompareHistoryResults(response.compares));
    setLoading((loading) => ({ ...loading, getCompareHistoryResults: false }));
  };

  const getCompareResultWithResultsAPI = async (query: GetCompareResultWithResultsQuery) => {
    setLoading((loading) => ({ ...loading, getCompareResultWithResults: true }));
    const response = await comparesHTTPClient.getCompareResultWithResults(query);

    if (response) {
      dispatch(setCompareResultWithResults(response.compares));
      dispatch(setCompareResultWithResultsAverageSummary(response.summary));
    }

    setLoading((loading) => ({ ...loading, getCompareResultWithResults: false }));
  };

  const getCompareResultWithAveragesAPI = async (query: GetCompareResultWithAveragesQuery) => {
    setLoading((loading) => ({ ...loading, getCompareResultWithAverages: true }));
    const response = await comparesHTTPClient.getCompareResultWithAverages(query);
    response && dispatch(setCompareResultWithAverages(response.compare));
    setLoading((loading) => ({ ...loading, getCompareResultWithAverages: false }));
  };

  const getCompareResultWithScenarioAPI = async (query: GetCompareResultWithScenarioQuery) => {
    setLoading((loading) => ({ ...loading, getCompareResultWithScenario: true }));
    const response = await comparesHTTPClient.getCompareResultWithScenario(query);
    response && dispatch(setCompareResultWithScenario(response.compare));
    setLoading((loading) => ({ ...loading, getCompareResultWithScenario: false }));
  };

  const getCompareMethodWithScenarioAPI = async (query: GetCompareMethodWithScenarioQuery) => {
    setLoading((loading) => ({ ...loading, getCompareMethodWithScenario: true }));
    const response = await comparesHTTPClient.getCompareMethodWithScenario(query);
    response && dispatch(setCompareMethodWithScenario(response.compare));
    setLoading((loading) => ({ ...loading, getCompareMethodWithScenario: false }));
  };

  const getCompareAveragesWithScenarioAPI = async (query: GetCompareAveragesWithScenarioQuery) => {
    setLoading((loading) => ({ ...loading, getCompareAveragesWithScenario: true }));
    const response = await comparesHTTPClient.getCompareAveragesWithScenario(query);
    response && dispatch(setCompareAveragesWithScenario(response.compare));
    setLoading((loading) => ({ ...loading, getCompareAveragesWithScenario: false }));
  };

  return (
    <ComparesContext.Provider
      value={{
        loading,
        getCompareHistoryResults: getCompareHistoryResultsAPI,
        getCompareResultWithResults: getCompareResultWithResultsAPI,
        getCompareResultWithAverages: getCompareResultWithAveragesAPI,
        getCompareResultWithScenario: getCompareResultWithScenarioAPI,
        getCompareMethodWithScenario: getCompareMethodWithScenarioAPI,
        getCompareAveragesWithScenario: getCompareAveragesWithScenarioAPI
      }}>
      {children}
    </ComparesContext.Provider>
  );
};

const useCompares = () => {
  const event = useContext(ComparesContext);
  if (event == null) {
    throw new Error('useCompares() called outside of a ComparesProvider?');
  }
  return event;
};

export { ComparesProvider, useCompares };
