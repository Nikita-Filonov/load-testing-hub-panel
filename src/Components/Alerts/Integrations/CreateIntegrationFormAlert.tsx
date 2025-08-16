import Box from '@mui/material/Box';
import { Alert } from '@mui/material';

export const CreateIntegrationFormAlert = () => {
  return (
    <Alert severity="info" variant="outlined">
      Here you can set up an integration with external services to view charts and dashboards during load tests. By
      providing a URL template, you can dynamically build any URL. Below is a list of variables that are automatically
      added to the template:
      <Box sx={{ mt: 1 }}>
        <li>
          <b>base_url</b> — The base URL of the integration system. Use it in the template as:{' '}
          <code>{`{base_url}`}</code>;
        </li>
        <li>
          <b>to_time</b> — The end time of the load testing result. Use it in the template as:{' '}
          <code>{`{to_time}`}</code>;
        </li>
        <li>
          <b>from_time</b> — The start time of the load testing result. Use it in the template as:{' '}
          <code>{`{from_time}`}</code>.
        </li>
      </Box>
      <Box sx={{ mt: 2 }}>
        All variables are optional. Include them in the template only if needed. For example, you can use{' '}
        <code>{`{base_url}`}</code> in the template using the templating mechanism.
      </Box>
    </Alert>
  );
};
