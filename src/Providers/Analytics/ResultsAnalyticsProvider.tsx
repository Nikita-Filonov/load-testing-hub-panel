import React, { FC, PropsWithChildren, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  setResultsNumberOfRequestsAnalytics,
  setResultsRequestsPerSecondAnalytics,
  setResultsResponseTimesAnalytics
} from '../../Redux/Analytics/AnalyticsSlice';
import { ResultsAnalyticsHTTPClient } from '../../Services/Clients/Analytics/ResultsAnalyticsHTTPClient';
import { GetResultsAnalyticsQuery } from '../../Models/Analytics/ResultsAnalytics';

interface Loading {
  getResponseTimesAnalytics: boolean;
  getNumberOfRequestsAnalytics: boolean;
  getRequestsPerSecondAnalytics: boolean;
}

export type ResultsAnalyticsContextProps = {
  loading: Loading;
  getResponseTimesAnalytics: (query: GetResultsAnalyticsQuery) => Promise<void>;
  getNumberOfRequestsAnalytics: (query: GetResultsAnalyticsQuery) => Promise<void>;
  getRequestsPerSecondAnalytics: (query: GetResultsAnalyticsQuery) => Promise<void>;
};

const ResultsAnalyticsContext = React.createContext<ResultsAnalyticsContextProps | null>(null);

const ResultsAnalyticsProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();
  const resultsAnalyticsHTTPClient = new ResultsAnalyticsHTTPClient();
  const [loading, setLoading] = useState<Loading>({
    getResponseTimesAnalytics: false,
    getNumberOfRequestsAnalytics: false,
    getRequestsPerSecondAnalytics: false
  });

  const getResponseTimesAnalyticsAPI = async (query: GetResultsAnalyticsQuery) => {
    setLoading({ ...loading, getResponseTimesAnalytics: true });
    const response = await resultsAnalyticsHTTPClient.getResponseTimesAnalytics(query);
    response && dispatch(setResultsResponseTimesAnalytics(response.analytics));
    setLoading({ ...loading, getResponseTimesAnalytics: false });
  };

  const getNumberOfRequestsAnalyticsAPI = async (query: GetResultsAnalyticsQuery) => {
    setLoading({ ...loading, getNumberOfRequestsAnalytics: true });
    const response = await resultsAnalyticsHTTPClient.getNumberOfRequestsAnalytics(query);
    response && dispatch(setResultsNumberOfRequestsAnalytics(response.analytics));
    setLoading({ ...loading, getNumberOfRequestsAnalytics: false });
  };

  const getRequestsPerSecondAnalyticsAPI = async (query: GetResultsAnalyticsQuery) => {
    setLoading({ ...loading, getRequestsPerSecondAnalytics: true });
    const response = await resultsAnalyticsHTTPClient.getRequestsPerSecondAnalytics(query);
    response && dispatch(setResultsRequestsPerSecondAnalytics(response.analytics));
    setLoading({ ...loading, getRequestsPerSecondAnalytics: false });
  };

  return (
    <ResultsAnalyticsContext.Provider
      value={{
        loading,
        getResponseTimesAnalytics: getResponseTimesAnalyticsAPI,
        getNumberOfRequestsAnalytics: getNumberOfRequestsAnalyticsAPI,
        getRequestsPerSecondAnalytics: getRequestsPerSecondAnalyticsAPI
      }}>
      {children}
    </ResultsAnalyticsContext.Provider>
  );
};

const useResultsAnalytics = () => {
  const event = useContext(ResultsAnalyticsContext);
  if (event == null) {
    throw new Error('useResultsAnalytics() called outside of a ResultsAnalyticsProvider?');
  }
  return event;
};

export { ResultsAnalyticsProvider, useResultsAnalytics };
