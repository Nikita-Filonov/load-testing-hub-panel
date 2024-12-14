import { Alert, Grid2 } from '@mui/material';
import { FC, PropsWithChildren } from 'react';
import { LoadingView } from './LoadingView';
import { BaseToolbarView, ToolbarAction } from '../Toolbar/BaseToolbarView';

type SettingsViewProps = {
  title: string;
  alert?: string;
  actions?: ToolbarAction[];
  loading?: boolean;
} & PropsWithChildren;

export const SettingsView: FC<SettingsViewProps> = (props) => {
  const { title, alert, actions, loading, children } = props;

  return (
    <Grid2 container spacing={3}>
      <Grid2 size={{ md: 12, xs: 12 }}>
        <BaseToolbarView title={title} actions={actions} />
      </Grid2>
      {alert && (
        <Grid2 size={{ md: 12, xs: 12 }}>
          <Alert severity={'info'} variant={'outlined'}>
            {alert}
          </Alert>
        </Grid2>
      )}
      <Grid2 size={{ md: 12, xs: 12 }}>{loading ? <LoadingView height={400} /> : children}</Grid2>
    </Grid2>
  );
};
