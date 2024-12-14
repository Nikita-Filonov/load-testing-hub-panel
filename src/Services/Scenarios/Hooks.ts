import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

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
