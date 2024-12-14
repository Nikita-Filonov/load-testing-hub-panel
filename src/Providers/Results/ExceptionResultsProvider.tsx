import React, { FC, PropsWithChildren, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ExceptionResultsHTTPClient } from '../../Services/Clients/Results/ExceptionResultsHTTPClient';
import { GetExceptionResultsQuery } from '../../Models/Results/ExceptionResults';
import {
  setExceptionResultDetails,
  setExceptionResults
} from '../../Redux/Results/ExceptionResults/ExceptionResultsSlice';

interface Loading {
  getExceptionResults: boolean;
  getExceptionResultDetails: boolean;
}

export type ExceptionResultsContextProps = {
  loading: Loading;
  getExceptionResults: (query: GetExceptionResultsQuery) => Promise<void>;
  getExceptionResultDetails: (exceptionResultId: number) => Promise<void>;
};

const ExceptionResultsContext = React.createContext<ExceptionResultsContextProps | null>(null);

const ExceptionResultsProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();
  const exceptionResultsHTTPClient = new ExceptionResultsHTTPClient();
  const [loading, setLoading] = useState<Loading>({
    getExceptionResults: false,
    getExceptionResultDetails: false
  });

  const getExceptionResultsAPI = async (query: GetExceptionResultsQuery) => {
    setLoading({ ...loading, getExceptionResults: true });
    const response = await exceptionResultsHTTPClient.getExceptionResults(query);
    response && dispatch(setExceptionResults(response.results));
    setLoading({ ...loading, getExceptionResults: false });
  };

  const getExceptionResultDetailsAPI = async (exceptionResultId: number) => {
    setLoading({ ...loading, getExceptionResultDetails: true });
    const response = await exceptionResultsHTTPClient.getExceptionResultDetails(exceptionResultId);
    response && dispatch(setExceptionResultDetails(response.details));
    setLoading({ ...loading, getExceptionResultDetails: false });
  };

  return (
    <ExceptionResultsContext.Provider
      value={{
        loading,
        getExceptionResults: getExceptionResultsAPI,
        getExceptionResultDetails: getExceptionResultDetailsAPI
      }}>
      {children}
    </ExceptionResultsContext.Provider>
  );
};

const useExceptionResults = () => {
  const event = useContext(ExceptionResultsContext);
  if (event == null) {
    throw new Error('useExceptionResults() called outside of a ExceptionResultsProvider?');
  }
  return event;
};

export { ExceptionResultsProvider, useExceptionResults };
