import { Alert, Grid } from '@mui/material';
import { FC, PropsWithChildren } from 'react';
import { LoadingView } from './LoadingView';
import { BaseToolbarView, ToolbarAction } from '../Toolbar/BaseToolbarView';
import { ValidationError } from '../../Services/Clients/Models';
import { ValidationErrorsView } from '../Alerts/ValidationErrorsView';

type SettingsViewProps = {
  title: string;
  alert?: string;
  actions?: ToolbarAction[];
  loading?: boolean;
  validationErrors?: ValidationError[];
} & PropsWithChildren;

export const SettingsView: FC<SettingsViewProps> = (props) => {
  const { title, alert, actions, loading, children, validationErrors } = props;

  return (
    <Grid container spacing={3}>
      <Grid size={{ md: 12, xs: 12 }}>
        <BaseToolbarView title={title} actions={actions} />
      </Grid>
      {alert && (
        <Grid size={{ md: 12, xs: 12 }}>
          <Alert severity={'info'} variant={'outlined'}>
            {alert}
          </Alert>
        </Grid>
      )}
      {validationErrors && validationErrors?.length > 0 && (
        <Grid size={{ md: 12, xs: 12 }}>
          <ValidationErrorsView errors={validationErrors} />
        </Grid>
      )}
      <Grid size={{ md: 12, xs: 12 }}>{loading ? <LoadingView height={400} /> : children}</Grid>
    </Grid>
  );
};
