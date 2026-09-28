import { Grid } from '@mui/material';
import { FC, ReactNode } from 'react';
import { MainLayout } from '../Layouts/MainLayouts';

type NavigationSidebarProps = {
  content: ReactNode;
  children: ReactNode;
};

export const NavigationSidebar: FC<NavigationSidebarProps> = ({ content, children }) => {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 3 }}>{children}</Grid>
      <Grid size={{ xs: 12, md: 9 }}>
        <MainLayout>{content}</MainLayout>
      </Grid>
    </Grid>
  );
};
