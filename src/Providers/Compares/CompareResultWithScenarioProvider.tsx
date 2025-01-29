import React, { FC, PropsWithChildren, useContext } from 'react';
import { useDispatch } from 'react-redux';
import {
  GetCompareResultWithScenarioQuery,
  GetCompareResultWithScenarioResponse
} from '../../Models/Compares/CompareResultWithScenario';
import { CompareResultWithScenarioHTTPClient } from '../../Services/Clients/Compares/CompareResultWithScenarioHTTPClient';
import { setCompareResultWithScenario } from '../../Redux/Compares/CompareResultWithScenario/Slice';
import { useAPIResponseHandler } from '../../Services/Clients/Hooks';
import { APIResponse } from '../../Services/Clients/Models';

interface Loading {
  getCompareResultWithScenario: boolean;
}

export type CompareResultWithScenarioContextProps = {
  loading: Loading;
  getCompareResultWithScenario: (
    query: GetCompareResultWithScenarioQuery
  ) => Promise<APIResponse<GetCompareResultWithScenarioResponse>>;
};

const CompareResultWithScenarioContext = React.createContext<CompareResultWithScenarioContextProps | null>(null);

const CompareResultWithScenarioProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();
  const { loading, handleAPIResponse } = useAPIResponseHandler({
    provider: CompareResultWithScenarioProvider.name,
    defaultLoading: { getCompareResultWithScenario: false }
  });
  const compareResultWithScenarioHTTPClient = new CompareResultWithScenarioHTTPClient();

  const getCompareResultWithScenarioAPI = async (query: GetCompareResultWithScenarioQuery) => {
    return await handleAPIResponse({
      key: 'getCompareResultWithScenario',
      call: compareResultWithScenarioHTTPClient.getCompareResultWithScenario(query),
      handler: (response) => dispatch(setCompareResultWithScenario(response.compare))
    });
  };

  return (
    <CompareResultWithScenarioContext.Provider
      value={{ loading, getCompareResultWithScenario: getCompareResultWithScenarioAPI }}>
      {children}
    </CompareResultWithScenarioContext.Provider>
  );
};

const useCompareResultWithScenario = () => {
  const event = useContext(CompareResultWithScenarioContext);
  if (event == null) {
    throw new Error('useCompareResultWithScenario() called outside of a CompareResultWithScenarioProvider?');
  }
  return event;
};

export { CompareResultWithScenarioProvider, useCompareResultWithScenario };
