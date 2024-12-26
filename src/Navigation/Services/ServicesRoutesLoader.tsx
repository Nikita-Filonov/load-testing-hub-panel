import { Outlet } from 'react-router-dom';
import { useServicesNavigation } from '../../Services/Services/Hooks';
import { useServices } from '../../Providers/Services/ServicesProvider';
import { SuspenseBackdropView } from '../../Components/Views/SuspenseBackdropView';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../Redux/ReduxState';
import { clearScenariosState } from '../../Redux/Services/Scenarios/ScenariosSlice';
import { clearMethodsState } from '../../Redux/Results/Methods/MethodsSlice';
import { clearAnalyticsState } from '../../Redux/Analytics/AnalyticsSlice';
import { clearLoadTestResultsState } from '../../Redux/Results/LoadTestResults/LoadTestResultsSlice';
import { clearIntegrationsState } from '../../Redux/Integrations/IntegrationsSlice';

export const ServicesRoutesLoader = () => {
  const dispatch = useDispatch();
  const { loading, getService } = useServices();
  const { serviceId, navigateServices } = useServicesNavigation();

  const service = useSelector((state: ReduxState) => state.services.service);

  useEffect(() => {
    serviceId && onLoadService();
  }, [serviceId]);

  useEffect(() => {
    service.id !== serviceId && clearState();
  }, [service.id, serviceId]);

  const clearState = () => {
    dispatch(clearMethodsState());
    dispatch(clearAnalyticsState());
    dispatch(clearScenariosState());
    dispatch(clearIntegrationsState());
    dispatch(clearLoadTestResultsState());
  };

  const onLoadService = async () => {
    const error = await getService(serviceId);
    error && navigateServices();
  };

  return loading.getService ? <SuspenseBackdropView /> : <Outlet />;
};
