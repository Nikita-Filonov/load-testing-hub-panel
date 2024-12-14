import Box from '@mui/material/Box';
import { LogoImage } from '../../Components/Images/LogoImage';
import { Typography } from '@mui/material';
import { OwnerLink } from '../../Components/Links/OwnerLink';
import { BackendRepoLink } from '../../Components/Links/BackendRepoLink';
import { FrontedRepoLink } from '../../Components/Links/FrontedRepoLink';

export const WelcomeView = () => {
  return (
    <Box>
      <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
        <LogoImage width={150} height={150} />
        <Typography variant={'h5'}>Welcome to Load testing metrics!</Typography>
      </Box>

      <li style={{ marginTop: 40 }}>
        <BackendRepoLink />
      </li>
      <li>
        <FrontedRepoLink />
      </li>

      <Typography sx={{ mt: 4 }}>
        If you have any questions, you can ask <OwnerLink />
      </Typography>
    </Box>
  );
};
