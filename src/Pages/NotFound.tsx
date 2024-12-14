import { Button } from '@mui/material';
import { AppRoutes } from '../Services/Constants/Routing';
import { MainLayout } from '../Components/Layouts/MainLayouts';
import Typography from '@mui/material/Typography';
import { useAppNavigation } from '../Services/Navigation/Hooks';

export const NotFound = () => {
  const { onNavigate } = useAppNavigation();

  const onHome = () => onNavigate(AppRoutes.Services);

  return (
    <MainLayout>
      <Typography sx={{ alignSelf: 'center', mt: 10 }} variant={'h5'}>
        Page not found
      </Typography>
      <Button variant={'outlined'} sx={{ mt: 4, alignSelf: 'center' }} onClick={onHome}>
        Go to home page
      </Button>
    </MainLayout>
  );
};
