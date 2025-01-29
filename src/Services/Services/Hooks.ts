import { useParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { AppRoutes } from '../Navigation/Routing';
import { useAppNavigation } from '../Navigation/Hooks';
import { useDispatch, useSelector } from 'react-redux';
import { useServices } from '../../Providers/Services/ServicesProvider';
import { ReduxState } from '../../Redux/ReduxState';
import { clearMethodsState } from '../../Redux/Methods/Slice';
import { clearAnalyticsState } from '../../Redux/Analytics/Slice';
import { clearScenariosState } from '../../Redux/Services/Scenarios/Slice';
import { clearIntegrationsState } from '../../Redux/Integrations/Slice';
import { clearLoadTestResultsState } from '../../Redux/Results/LoadTestResults/Slice';

export const useServicesNavigation = () => {
  const { serviceId: unsafeServiceId } = useParams<{ serviceId: string }>();
  const { onNavigate } = useAppNavigation();

  const serviceId = useMemo(() => Number(unsafeServiceId), [unsafeServiceId]);

  useEffect(() => {
    if (!serviceId) {
      navigateServices();
    }
  }, [serviceId]);

  const navigateServices = () => onNavigate(AppRoutes.Services);

  return { serviceId, navigateServices };
};

export const useServicesRoutesLoader = () => {
  const dispatch = useDispatch();
  const { loading, getService } = useServices();
  const { serviceId, navigateServices } = useServicesNavigation();

  const service = useSelector((state: ReduxState) => state.services.service);

  useEffect(() => {
    if (serviceId) {
      onLoadService();
    }
  }, [serviceId]);

  useEffect(() => {
    if (service.id !== serviceId) {
      clearState();
    }
  }, [service.id, serviceId]);

  const clearState = () => {
    dispatch(clearMethodsState());
    dispatch(clearAnalyticsState());
    dispatch(clearScenariosState());
    dispatch(clearIntegrationsState());
    dispatch(clearLoadTestResultsState());
  };

  const onLoadService = async () => {
    const result = await getService(serviceId);
    if (result.error) {
      navigateServices();
    }
  };

  return { loading: loading.getService };
};
