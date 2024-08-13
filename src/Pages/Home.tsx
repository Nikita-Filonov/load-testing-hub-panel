import { MainLayout } from '../Components/Layouts/MainLayouts';
import { DRAWER_ITEMS } from '../Services/Constants/DrawerItems';
import { Box, Typography } from '@mui/material';
import { BaseRouterLink } from '../Components/Links/BaseRouterLink';
import { OwnerLink } from '../Components/Links/OwnerLink';
import { LogoImage } from '../Components/Images/LogoImage';

export const Home = () => {
  return (
    <MainLayout>
      <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
        <LogoImage width={150} height={150} />
        <Typography variant={'h4'}>Welcome to Load testing hub!</Typography>
      </Box>

      <Typography sx={{ mt: 3 }} variant={'h6'}>
        Getting started:
      </Typography>
      <Typography>
        {DRAWER_ITEMS.map((item, index) => (
          <li key={index}>
            <BaseRouterLink to={item.route}>{item.title}</BaseRouterLink>
          </li>
        ))}
      </Typography>

      <Typography sx={{ mt: 3 }}>
        If you have any questions, you can ask <OwnerLink />
      </Typography>
    </MainLayout>
  );
};
