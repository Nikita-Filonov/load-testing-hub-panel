import { Button } from '@mui/material';
import { useAppNavigationService } from '../Services/HookServices/AppNavigationServiceHook';
import { AppRoutes } from '../Services/Constants/Routing';
import { MainLayout } from '../Components/Layouts/MainLayouts';
import Typography from '@mui/material/Typography';

export const NotFound = () => {
  const { onNavigate } = useAppNavigationService();

  const onHome = () => onNavigate(AppRoutes.Home);

  return (
    <MainLayout>
      <Typography sx={{ alignSelf: 'center' }} variant={'h5'}>
        Page not found
      </Typography>
      <Button variant={'outlined'} sx={{ mt: 4, alignSelf: 'center' }} onClick={onHome}>
        Go to home page
      </Button>
    </MainLayout>
  );
};
