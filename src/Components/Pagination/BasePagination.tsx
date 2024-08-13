import { Grid, Pagination, Typography } from '@mui/material';
import * as React from 'react';
import { ChangeEvent, FC } from 'react';

type BasePaginationProps = {
  page: number;
  total: number;
  limit: number;
  setPage: (page: number) => void;
  setOffset: (offset: number) => void;
};

export const BasePagination: FC<BasePaginationProps> = (props) => {
  const { page, total, limit, setPage, setOffset } = props;

  const onChange = (_: ChangeEvent<unknown>, page: number) => {
    setPage(page);
    setOffset((page - 1) * limit);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} md={6} sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography>Total results {total}</Typography>
      </Grid>
      <Grid item xs={6} md={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Pagination page={page} defaultPage={1} count={Math.ceil(total / limit)} color="primary" onChange={onChange} />
      </Grid>
    </Grid>
  );
};
