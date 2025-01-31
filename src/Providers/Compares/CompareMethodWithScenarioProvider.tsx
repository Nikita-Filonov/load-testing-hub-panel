import React, { FC, PropsWithChildren, useContext } from 'react';
import { useDispatch } from 'react-redux';
import {
  GetCompareMethodWithScenarioQuery,
  GetCompareMethodWithScenarioResponse
} from '../../Models/Compares/CompareMethodWithScenario';
import { CompareMethodWithScenarioHTTPClient } from '../../Services/Clients/Compares/CompareMethodWithScenarioHTTPClient';
import { setCompareMethodWithScenario } from '../../Redux/Compares/CompareMethodWithScenario/Slice';
import { useAPIResponseHandler } from '../../Services/Clients/Hooks';
import { APIResponse } from '../../Services/Clients/Models';

interface Loading {
  getCompareMethodWithScenario: boolean;
}

export type CompareMethodWithScenarioContextProps = {
  loading: Loading;
  getCompareMethodWithScenario: (
    query: GetCompareMethodWithScenarioQuery
  ) => Promise<APIResponse<GetCompareMethodWithScenarioResponse>>;
};

const CompareMethodWithScenarioContext = React.createContext<CompareMethodWithScenarioContextProps | null>(null);

const CompareMethodWithScenarioProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();
  const { loading, handleAPIResponse } = useAPIResponseHandler({
    provider: 'CompareMethodWithScenarioProvider',
    defaultLoading: { getCompareMethodWithScenario: false }
  });
  const compareMethodWithScenarioHTTPClient = new CompareMethodWithScenarioHTTPClient();

  const getCompareMethodWithScenarioAPI = async (query: GetCompareMethodWithScenarioQuery) => {
    return await handleAPIResponse({
      key: 'getCompareMethodWithScenario',
      call: compareMethodWithScenarioHTTPClient.getCompareMethodWithScenario(query),
      handler: (response) => dispatch(setCompareMethodWithScenario(response.compare))
    });
  };

  return (
    <CompareMethodWithScenarioContext.Provider
      value={{ loading, getCompareMethodWithScenario: getCompareMethodWithScenarioAPI }}>
      {children}
    </CompareMethodWithScenarioContext.Provider>
  );
};

const useCompareMethodWithScenario = () => {
  const event = useContext(CompareMethodWithScenarioContext);
  if (event == null) {
    throw new Error('useCompareMethodWithScenario() called outside of a CompareMethodWithScenarioProvider?');
  }
  return event;
};

export { CompareMethodWithScenarioProvider, useCompareMethodWithScenario };
