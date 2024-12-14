import React, { FC, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ScenariosHTTPClient } from '../../Services/Clients/Services/ScenariosHTTPClient';
import { CreateScenarioRequest, GetScenariosQuery, UpdateScenarioRequest } from '../../Models/Services/Scenarios';
import {
  createScenario,
  deleteScenario,
  setScenario,
  setScenarioDetails,
  setScenarios,
  updateScenario
} from '../../Redux/Services/Scenarios/ScenariosSlice';
import { useScenariosNavigation } from '../../Services/Scenarios/Hooks';

interface Loading {
  getScenario: boolean;
  getScenarios: boolean;
  createScenario: boolean;
  updateScenario: boolean;
  deleteScenario: boolean;
  getScenarioDetails: boolean;
}

export type ServicesContextProps = {
  loading: Loading;
  getScenarios: (query: GetScenariosQuery) => Promise<void>;
  createScenario: (request: CreateScenarioRequest) => Promise<boolean>;
  updateScenario: (scenarioId: number, request: UpdateScenarioRequest) => Promise<boolean>;
  deleteScenario: (scenarioId: number) => Promise<boolean>;
  getScenarioDetails: (scenarioId: number) => Promise<void>;
};

const ScenariosContext = React.createContext<ServicesContextProps | null>(null);

const ScenariosProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();
  const { scenarioId, removeScenarioId } = useScenariosNavigation();
  const scenariosHTTPClient = new ScenariosHTTPClient();
  const [loading, setLoading] = useState<Loading>({
    getScenario: false,
    getScenarios: false,
    createScenario: false,
    updateScenario: false,
    deleteScenario: false,
    getScenarioDetails: false
  });

  useEffect(() => {
    scenarioId && getScenarioAPI(scenarioId);
  }, [scenarioId]);

  const getScenarioAPI = async (scenarioId: number) => {
    setLoading({ ...loading, getScenario: true });
    const response = await scenariosHTTPClient.getScenario(scenarioId);

    if (response) {
      dispatch(setScenario(response.scenario));
      removeScenarioId();
    }

    setLoading({ ...loading, getScenario: false });
  };

  const getScenariosAPI = async (query: GetScenariosQuery) => {
    setLoading({ ...loading, getScenarios: true });
    const response = await scenariosHTTPClient.getScenarios(query);
    response && dispatch(setScenarios(response.scenarios));
    setLoading({ ...loading, getScenarios: false });
  };

  const createScenarioAPI = async (request: CreateScenarioRequest) => {
    setLoading({ ...loading, createScenario: true });
    const response = await scenariosHTTPClient.createScenario(request);
    response && dispatch(createScenario(response.details));
    setLoading({ ...loading, createScenario: false });

    return Boolean(!response);
  };

  const updateScenarioAPI = async (scenarioId: number, request: UpdateScenarioRequest) => {
    setLoading({ ...loading, updateScenario: true });
    const response = await scenariosHTTPClient.updateScenario(scenarioId, request);
    response && dispatch(updateScenario(response.details));
    setLoading({ ...loading, updateScenario: false });

    return Boolean(!response);
  };

  const deleteScenarioAPI = async (scenarioId: number) => {
    setLoading({ ...loading, deleteScenario: true });
    const error = await scenariosHTTPClient.deleteScenario(scenarioId);
    !error && dispatch(deleteScenario({ scenarioId }));
    setLoading({ ...loading, deleteScenario: false });

    return error;
  };

  const getScenarioDetailsAPI = async (scenarioId: number) => {
    setLoading({ ...loading, getScenarioDetails: true });
    const response = await scenariosHTTPClient.getScenarioDetails(scenarioId);
    response && dispatch(setScenarioDetails(response.details));
    setLoading({ ...loading, getScenarioDetails: false });
  };

  return (
    <ScenariosContext.Provider
      value={{
        loading,
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
