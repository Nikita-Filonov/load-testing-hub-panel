import { FC, PropsWithChildren, ReactNode } from 'react';
import { Box, Paper, SxProps, Table, TableBody, Theme } from '@mui/material';
import { LoadingView } from '../Views/LoadingView';

type BaseTableProps = {
  header: ReactNode;
  loading: boolean;
  containerSx?: SxProps<Theme>;
} & PropsWithChildren;

export const BaseTable: FC<BaseTableProps> = (props) => {
  const { header, loading, children, containerSx } = props;

  return (
    <Paper sx={{ overflow: 'auto', ...containerSx }}>
      <Box sx={{ width: '100%', display: 'table', tableLayout: 'fixed' }}>
        {loading ? (
          <LoadingView height={300} />
        ) : (
          <Table size={'small'}>
            {header}
            <TableBody>{children}</TableBody>
          </Table>
        )}
      </Box>
    </Paper>
  );
};
