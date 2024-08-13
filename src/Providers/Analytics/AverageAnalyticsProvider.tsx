import React, { FC, PropsWithChildren, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAverageAnalytics, setAverageAnalyticsScenarioCompare } from '../../Redux/Analytics/AnalyticsSlice';
import { AverageAnalyticsHTTPClient } from '../../Services/Clients/Analytics/AverageAnalyticsHTTPClient';
import { GetResultsAnalyticsQuery } from '../../Models/Analytics/ResultsAnalytics';
import { GetAverageAnalyticsScenarioCompareQuery } from '../../Models/Analytics/AverageAnalytics';

interface Loading {
  getAverageAnalytics: boolean;
  getAverageAnalyticsScenarioCompare: boolean;
}

export type AverageAnalyticsContextProps = {
  loading: Loading;
  getAverageAnalytics: (query: GetResultsAnalyticsQuery) => Promise<void>;
  getAverageAnalyticsScenarioCompare: (query: GetAverageAnalyticsScenarioCompareQuery) => Promise<void>;
};

const AverageAnalyticsContext = React.createContext<AverageAnalyticsContextProps | null>(null);

const AverageAnalyticsProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();
  const averageAnalyticsHTTPClient = new AverageAnalyticsHTTPClient();
  const [loading, setLoading] = useState<Loading>({
    getAverageAnalytics: false,
    getAverageAnalyticsScenarioCompare: false
  });

  const getAverageAnalyticsAPI = async (query: GetResultsAnalyticsQuery) => {
    setLoading((loading) => ({ ...loading, getAverageAnalytics: true }));
    const response = await averageAnalyticsHTTPClient.getAverageAnalytics(query);
    response && dispatch(setAverageAnalytics(response.analytics));
    setLoading((loading) => ({ ...loading, getAverageAnalytics: false }));
  };

  const getAverageAnalyticsScenarioCompareAPI = async (query: GetAverageAnalyticsScenarioCompareQuery) => {
    setLoading((loading) => ({ ...loading, getAverageAnalyticsScenarioCompare: true }));
    const response = await averageAnalyticsHTTPClient.getAverageAnalyticsScenarioCompare(query);
    response && dispatch(setAverageAnalyticsScenarioCompare(response.compare));
    setLoading((loading) => ({ ...loading, getAverageAnalyticsScenarioCompare: false }));
  };

  return (
    <AverageAnalyticsContext.Provider
      value={{
        loading,
        getAverageAnalytics: getAverageAnalyticsAPI,
        getAverageAnalyticsScenarioCompare: getAverageAnalyticsScenarioCompareAPI
      }}>
      {children}
    </AverageAnalyticsContext.Provider>
  );
};

const useAverageAnalytics = () => {
  const event = useContext(AverageAnalyticsContext);
  if (event == null) {
    throw new Error('useAverageAnalytics() called outside of a AverageAnalyticsProvider?');
  }
  return event;
};

export { AverageAnalyticsProvider, useAverageAnalytics };
