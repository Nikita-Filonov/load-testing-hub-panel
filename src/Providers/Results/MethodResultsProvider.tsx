import React, { FC, PropsWithChildren, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { MethodResultsHTTPClient } from '../../Services/Clients/Results/MethodResultsHTTPClient';
import { GetMethodResultsQuery } from '../../Models/Results/MethodResults';
import { setMethodResults } from '../../Redux/Results/MethodResults/MethodResultsSlice';

interface Loading {
  getMethodResults: boolean;
}

export type MethodResultsContextProps = {
  loading: Loading;
  getMethodResults: (query: GetMethodResultsQuery) => Promise<void>;
};

const MethodResultsContext = React.createContext<MethodResultsContextProps | null>(null);

const MethodResultsProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();
  const methodResultsHTTPClient = new MethodResultsHTTPClient();
  const [loading, setLoading] = useState<Loading>({
    getMethodResults: false
  });

  const getMethodResultsAPI = async (query: GetMethodResultsQuery) => {
    setLoading({ ...loading, getMethodResults: true });
    const response = await methodResultsHTTPClient.getMethodResults(query);
    response && dispatch(setMethodResults(response.results));
    setLoading({ ...loading, getMethodResults: false });
  };

  return (
    <MethodResultsContext.Provider value={{ loading, getMethodResults: getMethodResultsAPI }}>
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
