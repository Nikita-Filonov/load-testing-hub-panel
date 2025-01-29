import { Metrics } from '../../../Models/Metrics/Base';
import Box from '@mui/material/Box';
import { ResponseTimesForm } from './ResponseTimesForm';
import { NumberOfRequestsForm } from './NumberOfRequestsForm';
import { PercentilesForm } from './PercentilesForm';
import { RequestsPerSecondForm } from './RequestsPerSecondForm';

type MetricsFormProps<T extends Metrics> = {
  data: T;
  setData: (data: T) => void;
};

export const MetricsForm = <T extends Metrics>({ data, setData }: MetricsFormProps<T>) => {
  return (
    <Box>
      <ResponseTimesForm data={data} setData={setData} />
      <NumberOfRequestsForm data={data} setData={setData} />
      <RequestsPerSecondForm data={data} setData={setData} />
      <PercentilesForm data={data} setData={setData} />
    </Box>
  );
};
