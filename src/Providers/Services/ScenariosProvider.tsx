import React, { FC, PropsWithChildren, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { ScenariosHTTPClient } from '../../Services/Clients/Services/ScenariosHTTPClient';
import {
  CreateScenarioRequest,
  GetScenarioDetailsResponse,
  GetScenarioResponse,
  GetScenariosQuery,
  GetScenariosResponse,
  UpdateScenarioRequest
} from '../../Models/Services/Scenarios';
import {
  createScenario,
  deleteScenario,
  setScenario,
  setScenarioDetails,
  setScenarios,
  updateScenario
} from '../../Redux/Services/Scenarios/Slice';
import { APIResponse } from '../../Services/Clients/Models';
import { useAPIResponseHandler } from '../../Services/Clients/Hooks';

export enum ScenariosErrorKey {
  CreateScenario = 'ScenariosProvider/createScenario',
  UpdateScenario = 'ScenariosProvider/updateScenario'
}

interface Loading {
  getScenario: boolean;
  getScenarios: boolean;
  createScenario: boolean;
  updateScenario: boolean;
  deleteScenario: boolean;
  getScenarioDetails: boolean;
}

export type ScenariosContextProps = {
  loading: Loading;
  getScenario: (scenarioId: number) => Promise<APIResponse<GetScenarioResponse>>;
  getScenarios: (query: GetScenariosQuery) => Promise<APIResponse<GetScenariosResponse>>;
  createScenario: (request: CreateScenarioRequest) => Promise<APIResponse<GetScenarioDetailsResponse>>;
  updateScenario: (
    scenarioId: number,
    request: UpdateScenarioRequest
  ) => Promise<APIResponse<GetScenarioDetailsResponse>>;
  deleteScenario: (scenarioId: number) => Promise<APIResponse>;
  getScenarioDetails: (scenarioId: number) => Promise<APIResponse<GetScenarioDetailsResponse>>;
};

const ScenariosContext = React.createContext<ScenariosContextProps | null>(null);

const ScenariosProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();
  const { loading, handleAPIResponse } = useAPIResponseHandler({
    provider: ScenariosProvider.name,
    defaultLoading: {
      getScenario: false,
      getScenarios: false,
      createScenario: false,
      updateScenario: false,
      deleteScenario: false,
      getScenarioDetails: false
    }
  });
  const scenariosHTTPClient = new ScenariosHTTPClient();

  const getScenarioAPI = async (scenarioId: number) => {
    return await handleAPIResponse({
      key: 'getScenario',
      call: scenariosHTTPClient.getScenario(scenarioId),
      handler: (response) => dispatch(setScenario(response.scenario))
    });
  };

  const getScenariosAPI = async (query: GetScenariosQuery) => {
    return await handleAPIResponse({
      key: 'getScenarios',
      call: scenariosHTTPClient.getScenarios(query),
      handler: (response) => dispatch(setScenarios(response.scenarios))
    });
  };

  const createScenarioAPI = async (request: CreateScenarioRequest) => {
    return await handleAPIResponse({
      key: 'createScenario',
      call: scenariosHTTPClient.createScenario(request),
      handler: (response) => dispatch(createScenario(response.details))
    });
  };

  const updateScenarioAPI = async (scenarioId: number, request: UpdateScenarioRequest) => {
    return await handleAPIResponse({
      key: 'updateScenario',
      call: scenariosHTTPClient.updateScenario(scenarioId, request),
      handler: (response) => dispatch(updateScenario(response.details))
    });
  };

  const deleteScenarioAPI = async (scenarioId: number) => {
    return await handleAPIResponse({
      key: 'deleteScenario',
      call: scenariosHTTPClient.deleteScenario(scenarioId),
      handler: () => dispatch(deleteScenario({ scenarioId }))
    });
  };

  const getScenarioDetailsAPI = async (scenarioId: number) => {
    return await handleAPIResponse({
      key: 'getScenarioDetails',
      call: scenariosHTTPClient.getScenarioDetails(scenarioId),
      handler: (response) => dispatch(setScenarioDetails(response.details))
    });
  };

  return (
    <ScenariosContext.Provider
      value={{
        loading,
        getScenario: getScenarioAPI,
        getScenarios: getScenariosAPI,
        createScenario: createScenarioAPI,
        updateScenario: updateScenarioAPI,
        deleteScenario: deleteScenarioAPI,
        getScenarioDetails: getScenarioDetailsAPI
      }}>
      {children}
    </ScenariosContext.Provider>
  );
};

const useScenarios = () => {
  const event = useContext(ScenariosContext);
  if (event == null) {
    throw new Error('useScenarios() called outside of a ScenariosProvider?');
  }
  return event;
};

export { ScenariosProvider, useScenarios };
