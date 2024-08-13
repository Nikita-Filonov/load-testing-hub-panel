import { useSearchParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { useAppNavigationService } from '../HookServices/AppNavigationServiceHook';
import { AppRoutes } from '../Constants/Routing';

export const useMethodDetailsSearchParams = () => {
  const { onNavigate } = useAppNavigationService();
  const [searchParams] = useSearchParams();

  const method = useMemo(() => searchParams.get('method'), [searchParams]);

  useEffect(() => {
    if (!method) {
      onNavigate(AppRoutes.Methods);
    }
  }, [method]);

  return { method };
};
