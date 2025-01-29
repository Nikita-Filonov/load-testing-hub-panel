import { useSearchParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { useScenarios } from '../../Providers/Services/ScenariosProvider';

export const useScenariosNavigation = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const scenarioId = useMemo(() => Number(searchParams.get('scenarioId')), [searchParams]);

  const removeScenarioId = () => {
    const updatedSearchParams = new URLSearchParams(searchParams);
    updatedSearchParams.delete('scenarioId');

    setSearchParams(updatedSearchParams);
  };

  return { scenarioId, removeScenarioId };
};

export const useScenariosRoutesLoader = () => {
  const { loading, getScenario } = useScenarios();
  const { scenarioId, removeScenarioId } = useScenariosNavigation();

  useEffect(() => {
    if (scenarioId) {
      onLoadScenario();
    }
  }, [scenarioId]);

  const onLoadScenario = async () => {
    const result = await getScenario(scenarioId);
    if (!result.error) {
      removeScenarioId();
    }
  };

  return { loading: loading.getScenario };
};
