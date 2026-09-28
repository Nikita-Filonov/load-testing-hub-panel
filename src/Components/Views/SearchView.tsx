import { Grid } from '@mui/material';
import { SearchTextField, SearchTextFieldProps } from '../TextFields/SearchTextField';
import { FC } from 'react';
import Typography from '@mui/material/Typography';

type SearchViewProps = SearchTextFieldProps & { totalResults: number };

export const SearchView: FC<SearchViewProps> = (props) => {
  const { totalResults, ...other } = props;

  return (
    <Grid sx={{ mt: 2 }} container spacing={2}>
      <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography>Total results: {totalResults}</Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', alignItems: 'center' }}>
        <SearchTextField sx={{ mt: 0 }} {...other} />
      </Grid>
    </Grid>
  );
};
