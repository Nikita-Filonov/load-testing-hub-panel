import { useParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { AppRoutes } from '../Constants/Routing';
import { useAppNavigation } from '../Navigation/Hooks';

export const useServicesNavigation = () => {
  const { serviceId: unsafeServiceId } = useParams<{ serviceId: string }>();
  const { onNavigate } = useAppNavigation();

  const serviceId = useMemo(() => Number(unsafeServiceId), [unsafeServiceId]);

  useEffect(() => {
    !serviceId && navigateServices();
  }, [serviceId]);

  const navigateServices = () => onNavigate(AppRoutes.Services);

  return { serviceId, navigateServices };
};
