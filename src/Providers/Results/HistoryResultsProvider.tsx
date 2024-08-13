import React, { FC, PropsWithChildren, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setHistoryResults, setHistoryResultsCompare } from '../../Redux/Results/HistoryResults/HistoryResultsSlice';
import { HistoryResultsHTTPClient } from '../../Services/Clients/Results/HistoryResultsHTTPClient';
import { GetHistoryResultsQuery } from '../../Models/Results/HistoryResults';

interface Loading {
  getHistoryResults: boolean;
  getHistoryResultsCompare: boolean;
}

export type HistoryResultsContextProps = {
  loading: Loading;
  getHistoryResults: (query: GetHistoryResultsQuery) => Promise<void>;
  getHistoryResultsCompare: (query: GetHistoryResultsQuery) => Promise<void>;
};

const HistoryResultsContext = React.createContext<HistoryResultsContextProps | null>(null);

const HistoryResultsProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();
  const historyResultsHTTPClient = new HistoryResultsHTTPClient();
  const [loading, setLoading] = useState<Loading>({
    getHistoryResults: false,
    getHistoryResultsCompare: false
  });

  const getHistoryResultsAPI = async (query: GetHistoryResultsQuery) => {
    setLoading({ ...loading, getHistoryResults: true });
    const response = await historyResultsHTTPClient.getHistoryResults(query);
    response && dispatch(setHistoryResults(response.results));
    setLoading({ ...loading, getHistoryResults: false });
  };

  const getHistoryResultsCompareAPI = async (query: GetHistoryResultsQuery) => {
    setLoading({ ...loading, getHistoryResultsCompare: true });
    const response = await historyResultsHTTPClient.getHistoryResultsCompare(query);
    response && dispatch(setHistoryResultsCompare(response.compare));
    setLoading({ ...loading, getHistoryResultsCompare: false });
  };

  return (
    <HistoryResultsContext.Provider
      value={{
        loading,
        getHistoryResults: getHistoryResultsAPI,
        getHistoryResultsCompare: getHistoryResultsCompareAPI
      }}>
      {children}
    </HistoryResultsContext.Provider>
  );
};

const useHistoryResults = () => {
  const event = useContext(HistoryResultsContext);
  if (event == null) {
    throw new Error('useHistoryResults() called outside of a HistoryResultsProvider?');
  }
  return event;
};

export { HistoryResultsProvider, useHistoryResults };
