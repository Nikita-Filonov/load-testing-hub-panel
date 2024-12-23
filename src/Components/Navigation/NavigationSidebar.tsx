import { Grid2 } from '@mui/material';
import { FC, ReactNode } from 'react';
import { MainLayout } from '../Layouts/MainLayouts';

type NavigationSidebarProps = {
  content: ReactNode;
  children: ReactNode;
};

export const NavigationSidebar: FC<NavigationSidebarProps> = ({ content, children }) => {
  return (
    <Grid2 container spacing={2}>
      <Grid2 size={{ xs: 12, md: 3 }}>{children}</Grid2>
      <Grid2 size={{ xs: 12, md: 9 }}>
        <MainLayout>{content}</MainLayout>
      </Grid2>
    </Grid2>
  );
};
