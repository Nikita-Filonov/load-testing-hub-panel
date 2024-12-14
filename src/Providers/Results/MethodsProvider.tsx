import React, { FC, PropsWithChildren, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { MethodsHTTPClient } from '../../Services/Clients/Results/MethodsHTTPClient';
import { GetMethodDetailsQuery, GetMethodsQuery, GetShortMethodsQuery } from '../../Models/Results/Methods';
import { setMethodDetails, setMethods, setShortMethods } from '../../Redux/Results/Methods/MethodsSlice';

interface Loading {
  getMethods: boolean;
  getShortMethods: boolean;
  getMethodDetails: boolean;
}

export type MethodsContextProps = {
  loading: Loading;
  getMethods: (query: GetMethodsQuery) => Promise<void>;
  getShortMethods: (query: GetShortMethodsQuery) => Promise<void>;
  getMethodDetails: (query: GetMethodDetailsQuery) => Promise<void>;
};

const MethodsContext = React.createContext<MethodsContextProps | null>(null);

const MethodsProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();
  const methodsHTTPClient = new MethodsHTTPClient();
  const [loading, setLoading] = useState<Loading>({
    getMethods: false,
    getShortMethods: false,
    getMethodDetails: false
  });

  const getMethodsAPI = async (query: GetMethodsQuery) => {
    setLoading({ ...loading, getMethods: true });
    const response = await methodsHTTPClient.getMethods(query);
    response && dispatch(setMethods(response.methods));
    setLoading({ ...loading, getMethods: false });
  };

  const getShortMethodsAPI = async (query: GetShortMethodsQuery) => {
    setLoading({ ...loading, getShortMethods: true });
    const response = await methodsHTTPClient.getShortMethods(query);
    response && dispatch(setShortMethods(response.methods));
    setLoading({ ...loading, getShortMethods: false });
  };

  const getMethodDetailsAPI = async (query: GetMethodDetailsQuery) => {
    setLoading((loading) => ({ ...loading, getMethodDetails: true }));
    const response = await methodsHTTPClient.getMethodDetails(query);
    response && dispatch(setMethodDetails(response.details));
    setLoading((loading) => ({ ...loading, getMethodDetails: false }));
  };

  return (
    <MethodsContext.Provider
      value={{
        loading,
        getMethods: getMethodsAPI,
        getShortMethods: getShortMethodsAPI,
        getMethodDetails: getMethodDetailsAPI
      }}>
      {children}
    </MethodsContext.Provider>
  );
};

const useMethods = () => {
  const event = useContext(MethodsContext);
  if (event == null) {
    throw new Error('useMethods() called outside of a MethodsProvider?');
  }
  return event;
};

export { MethodsProvider, useMethods };
