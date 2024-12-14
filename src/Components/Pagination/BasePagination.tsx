import { Grid2, Pagination, SxProps, Theme, Typography } from '@mui/material';
import * as React from 'react';
import { ChangeEvent, FC } from 'react';

type BasePaginationProps = {
  page: number;
  total: number;
  limit: number;
  setPage: (page: number) => void;
  setOffset: (offset: number) => void;
  containerSx?: SxProps<Theme>;
};

export const BasePagination: FC<BasePaginationProps> = (props) => {
  const { page, total, limit, setPage, setOffset, containerSx } = props;

  const onChange = (_: ChangeEvent<unknown>, page: number) => {
    setPage(page);
    setOffset((page - 1) * limit);
  };

  return (
    <Grid2 container spacing={2} sx={containerSx}>
      <Grid2 size={{ xs: 6, md: 6 }} sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography>Total results {total}</Typography>
      </Grid2>
      <Grid2 size={{ xs: 6, md: 6 }} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Pagination page={page} defaultPage={1} count={Math.ceil(total / limit)} color="primary" onChange={onChange} />
      </Grid2>
    </Grid2>
  );
};
